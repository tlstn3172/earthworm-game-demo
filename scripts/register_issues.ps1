
param (
    [switch]$DryRun
)

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$tasksPath = Join-Path $PSScriptRoot "../docs/TASKS.md"
$content = Get-Content -Path $tasksPath -Raw -Encoding UTF8
$lines = $content -split "`n"

$issues = @()
$currentPhase = ""
$currentIssue = $null
$buffer = @()

foreach ($line in $lines) {
    if ($line -match "^## Phase") {
        # Save previous issue
        if ($currentIssue) {
            $currentIssue.Body = $buffer -join "`n"
            $issues += $currentIssue
            $currentIssue = $null
            $buffer = @()
        }
        $currentPhase = $line -replace "^## ", ""
        continue
    }
    
    # Skip non-Phase sections (e.g., Priority Guide, Progress, etc.)
    if ($line -match "^## " -and -not ($line -match "^## Phase")) {
        # Save previous issue and stop processing if we hit a non-Phase section
        if ($currentIssue) {
            $currentIssue.Body = $buffer -join "`n"
            $issues += $currentIssue
            $currentIssue = $null
        }
        $currentPhase = "" # Reset phase to stop capturing
        continue
    }

    # Only process if we are in a valid Phase
    if ($currentPhase -eq "") {
        continue
    }

    if ($line -match "^### (.*)") {
        if ($currentIssue) {
            $currentIssue.Body = $buffer -join "`n"
            $issues += $currentIssue
        }

        $title = $matches[1].Trim()
        
        $currentIssue = @{
            Title = "[$($currentPhase.Split(':')[0])] $title"
            Phase = $currentPhase
            Body  = ""
        }

        $buffer = @()
        $buffer += "## 작업 배경"
        $buffer += "$currentPhase의 하위 작업입니다."
        $buffer += ""
        $buffer += "## 작업 내용"
        continue
    }

    if ($currentIssue) {
        $buffer += $line
    }
}

# Add last issue
if ($currentIssue) {
    $currentIssue.Body = $buffer -join "`n"
    $issues += $currentIssue
}

Write-Host "Found $($issues.Count) issues to create."

foreach ($issue in $issues) {
    # Skip finished phases check if needed? No, user wants to register all.
    # But Phase 0 is already done. Should we register it? 
    # User said "register tasks", usually meaning "To Do".
    # Phase 0 has "✅" in TASKS.md. 
    # Let's check if the checkboxes are all checked?
    # Or just skip Phase 0 based on title.
    
    if ($issue.Phase -match "Phase 0") {
        continue
    }

    Write-Host "`n----------------------------------------"
    Write-Host "Title: $($issue.Title)"
    
    $finalBody = $issue.Body.Trim()
    
    if ($DryRun) {
        Write-Host "`nBody Preview:`n$($finalBody.Substring(0, [Math]::Min(200, $finalBody.Length)))..."
    } else {
        $bodyFile = Join-Path $PSScriptRoot "temp_issue_body.md"
        $finalBody | Set-Content -Path $bodyFile -Encoding UTF8
        
        Write-Host "Creating issue: $($issue.Title)..."
        try {
            # Use --title with explicit encoding/quoting if needed.
            # PowerShell passing args to native executables:
            $titleArg = $issue.Title
            
            & gh issue create --title $titleArg --body-file $bodyFile
            
            if ($LASTEXITCODE -ne 0) {
                Write-Error "Failed to create issue."
            }
        } catch {
            Write-Error "Error: $_"
        }
        
        Remove-Item $bodyFile -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
    }
}
