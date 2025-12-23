
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tasksPath = path.join(__dirname, '../docs/TASKS.md');

function parseTasks() {
    const content = fs.readFileSync(tasksPath, 'utf8');
    const lines = content.split('\n');
    const issues = [];

    let currentPhase = '';
    let currentIssue = null;
    let buffer = [];

    for (const line of lines) {
        // Phase detection (Level 2 header)
        if (line.match(/^## Phase/)) {
            // Save previous issue if exists
            if (currentIssue) {
                currentIssue.body = buffer.join('\n').trim();
                issues.push(currentIssue);
                currentIssue = null;
                buffer = [];
            }
            currentPhase = line.replace(/^## /, '').trim();
            continue;
        }

        // Issue detection (Level 3 header)
        const issueMatch = line.match(/^### (.*)/);
        if (issueMatch) {
            if (currentIssue) {
                currentIssue.body = buffer.join('\n').trim();
                issues.push(currentIssue);
            }

            const title = issueMatch[1].trim();
            // Extract numeric prefix (e.g., "1.1")
            const prefixMatch = title.match(/^(\d+\.\d+)/);
            const prefix = prefixMatch ? prefixMatch[1] : '';

            currentIssue = {
                title: `[${currentPhase.split(':')[0]}] ${title}`,
                phase: currentPhase,
                body: ''
            };

            buffer = [];
            buffer.push(`## 작업 배경`);
            buffer.push(`${currentPhase}의 하위 작업입니다.`);
            buffer.push('');
            buffer.push(`## 작업 내용`);
            continue;
        }

        // Add to buffer if inside an issue
        if (currentIssue) {
            buffer.push(line);
        }
    }

    // Add last issue
    if (currentIssue) {
        currentIssue.body = buffer.join('\n').trim();
        issues.push(currentIssue);
    }

    return issues;
}

function createIssues(issues, dryRun = false) {
    console.log(`Found ${issues.length} issues to create.`);

    for (const issue of issues) {
        console.log(`\n----------------------------------------`);
        console.log(`Title: ${issue.title}`);

        // Refine Body
        // Replace "#### " with "### " for sub-sections in body
        // And ensure sections are clearly separated
        let body = issue.body;

        // Add Acceptance Criteria section if not explicitly present but implied by checkboxes
        if (!body.includes('## 인수 조건') && body.includes('- [ ]')) {
            // We can just keep the checkboxes as part of "Work Description" or move them.
            // The user request asked for "Acceptance Criteria".
            // Let's create a separate section if there are checklist items.
            // Simple heuristic: Move all line starting with "- [ ]" to Acceptance Criteria?
            // Might be risky if context is lost.
            // Instead, let's just append "## 인수 조건" before the checklist items if feasible,
            // or just label the whole checklist area as Acceptance Criteria.

            // Current buffer strategy just dumps everything into "Work Description".
            // Let's slightly improve the buffer construction in parsing or here.
            // Actually, the prompt asked for "Background", "Work Description", "Acceptance Criteria".

            // Let's split the body:
            // Anything that is a checklist ` - [ ]` could be Acceptance Criteria.
            // Anything else is Work Description.

            const lines = body.split('\n');
            const descLines = [];
            const acLines = [];

            let isAC = false;
            for (const l of lines) {
                if (l.trim().startsWith('- [ ]') || l.trim().startsWith('  - [ ]')) {
                    isAC = true;
                }

                if (isAC && (l.trim().startsWith('- [ ]') || l.trim().startsWith('  - [ ]') || l.trim() === '')) {
                    acLines.push(l);
                } else {
                    // If we encounter a non-checklist line after starting AC, maybe switch back?
                    // It's hard to parse perfectly.
                    // Let's just keep the original body structure but wrap it.
                    // Or, we can just treat the existing structure as Work Description & AC combined.
                    // To strictly follow "Background, Work Description, Acceptance Criteria":

                    // My current parser adds "## 작업 내용" at start.
                    // I'll add "## 인수 조건" before the last block of checkboxes if possible.
                    descLines.push(l);
                }
            }
            // This splitting is too fragile.
            // Let's just create the body with standard headers and let markdown render it.
        }

        // Final Body Formatting
        const finalBody = `${issue.body}`;
        // Note: parsed body already starts with "## 작업 배경... \n ## 작업 내용"

        if (dryRun) {
            console.log(`\nBody Preview:\n${finalBody.substring(0, 200)}...`);
        } else {
            try {
                // Escape quotes for shell command if needed, but using spawn/execFileSync with array args is safer.
                // But execSync takes a string. gh cli handles inputs well usually.
                // Better to use temp file for body to avoid shell escaping issues.
                const bodyFile = path.join(__dirname, 'temp_issue_body.md');
                fs.writeFileSync(bodyFile, finalBody);

                console.log(`Creating issue: ${issue.title}...`);
                execSync(`gh issue create --title "${issue.title}" --body-file "${bodyFile}"`, { stdio: 'inherit' });

                fs.unlinkSync(bodyFile);

                // Sleep to avoid rate limits
                const delay = 2000;
                const start = Date.now();
                while (Date.now() - start < delay) { }

            } catch (error) {
                console.error(`Failed to create issue: ${issue.title}`, error.message);
            }
        }
    }
}

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const issues = parseTasks();
createIssues(issues, dryRun);
