import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Uses Playwright from the project's normal Node dependency installation.
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const appPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'index.html');
const browser = await chromium.launch({
  headless: true,
  timeout: 15000,
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})
});
const page = await browser.newPage();
const results = [];

async function check(name, action) {
  try {
    await action();
    results.push({ name, result: 'PASS' });
  } catch (error) {
    results.push({ name, result: 'FAIL', detail: error.message });
  }
}

try {
  await page.goto(`file:///${appPath.replaceAll('\\', '/')}`);

  await check('앱과 64개 질문 표시', async () => {
    await page.getByRole('heading', { name: 'My OPIC Trainer' }).waitFor();
    assert.equal(await page.locator('.question-count').innerText(), '16 topics · 64 prompts');
    assert.equal(await page.locator('#topicFilter option').count(), 17); // 전체 + 16개 주제
  });

  await check('질문 선택 및 영어 문장 열기', async () => {
    await page.locator('#typeFilter').selectOption('3');
    await page.locator('#topicFilter').selectOption('movies');
    await page.getByRole('button', { name: '새로운 질문 뽑기' }).click();
    assert.match(await page.locator('#typeBadge').innerText(), /TYPE 3/);
    assert.match(await page.locator('#topicBadge').innerText(), /영화/);
    await page.getByRole('button', { name: '문장 확인' }).click();
    assert.equal(await page.locator('#prompt').isVisible(), true);
    assert.ok((await page.locator('#prompt').innerText()).length > 20);
  });

  await check('즐겨찾기 저장 및 다시 불러오기', async () => {
    await page.locator('#favoriteBtn').click();
    assert.equal(await page.locator('#favoriteBtn').getAttribute('aria-pressed'), 'true');
    await page.locator('#favoritesNav').click();
    assert.equal(await page.locator('.favorite-item').count(), 1);
    await page.locator('.favorite-item').click();
    assert.equal(await page.locator('#practiceView').isVisible(), true);
  });

  await check('타이머 시작·정지·초기화', async () => {
    await page.locator('#timerStart').click();
    assert.equal(await page.locator('#timerPause').isEnabled(), true);
    await page.waitForTimeout(1100);
    await page.locator('#timerPause').click();
    assert.notEqual(await page.locator('#timer').innerText(), '00:00 / 01:30');
    await page.locator('#timerReset').click();
    assert.equal(await page.locator('#timer').innerText(), '00:00 / 01:30');
  });

  const failed = results.filter(result => result.result === 'FAIL');
  for (const result of results) {
    console.log(`${result.result} ${result.name}${result.detail ? ` — ${result.detail}` : ''}`);
  }
  if (failed.length) process.exitCode = 1;
} finally {
  await browser.close();
}
