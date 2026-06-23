#!/usr/bin/env bash
# scripts/swipefile-hunter.sh
#
# Automation wrapper for the /swipefile-hunter Claude Code skill.
# Runs the skill headlessly via `claude -p` (non-interactive print mode).
#
# Usage:
#   ./scripts/swipefile-hunter.sh              # no niche, general content
#   ./scripts/swipefile-hunter.sh "sports"     # niche focus
#
# Cron (Linux) — runs every day at 05:00:
#   0 5 * * * /home/user/Sporg/scripts/swipefile-hunter.sh >> /home/user/Sporg/swipefile/logs/cron.log 2>&1
#
# launchd (macOS) — see scripts/com.swipefile-hunter.plist

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DATE="$(date +%Y-%m-%d)"
LOG_DIR="$PROJECT_DIR/swipefile/logs"
NICHE="${1:-}"

mkdir -p "$LOG_DIR"

cd "$PROJECT_DIR"

echo "[$DATE $(date +%H:%M:%S)] Starting swipefile-hunter (niche: ${NICHE:-general})" >> "$LOG_DIR/$DATE.log"

# claude -p: non-interactive print mode — safe for cron/launchd
# --allowedTools: restrict to only the four tools the skill needs
claude -p \
  --allowedTools "WebSearch,WebFetch,Write,Bash" \
  "/swipefile-hunter $NICHE" \
  >> "$LOG_DIR/$DATE.log" 2>&1

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
  echo "[$DATE $(date +%H:%M:%S)] Completed successfully. Output: $PROJECT_DIR/swipefile/$DATE.md" >> "$LOG_DIR/$DATE.log"
else
  echo "[$DATE $(date +%H:%M:%S)] ERROR: claude exited with code $EXIT_CODE" >> "$LOG_DIR/$DATE.log"
  exit $EXIT_CODE
fi
