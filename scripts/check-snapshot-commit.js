const fs = require('fs');
const exec = require('child_process').exec;

exec(
  'git diff --name-only --staged | grep -E "packages/[^/]+/(package.json|CHANGELOG.md)"',
  (_, stdout) => {
    const fileNameList = stdout.split('\n');

    fileNameList.forEach((fileName) => {
      if (!fileName) {
        return;
      }

      const fileContent = fs.readFileSync(fileName);

      if (fileContent.includes('snapshot')) {
        console.error(
          `snapshot 릴리즈 변경사항이 반영된 파일 ${fileName} 은 commit 할 수 없습니다. 변경사항을 제외해주세요.`,
        );
        process.exit(1);
      }
    });
  },
);
