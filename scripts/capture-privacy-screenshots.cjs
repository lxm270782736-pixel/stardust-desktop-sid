const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const baseUrl =
  process.env.PROTOTYPE_URL ||
  'http://127.0.0.1:4174/stardust-desktop-sid/index.html';
const outputDir = path.resolve(
  __dirname,
  '..',
  'site',
  'prd-assets',
  'privacy-r5'
);
const executablePath =
  process.env.CHROME_PATH ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

fs.mkdirSync(outputDir, { recursive: true });
fs.rmSync(path.join(outputDir, '03-stock-privacy-settings.png'), {
  force: true,
});

function url(params) {
  return `${baseUrl}?${new URLSearchParams(params).toString()}`;
}

async function openPage(browser, params, waitForTestId, initScript) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    locale: 'zh-CN',
  });
  if (initScript) await context.addInitScript(initScript);
  const page = await context.newPage();
  await page.goto(url(params), { waitUntil: 'domcontentloaded' });
  await page.getByTestId(waitForTestId).waitFor({ state: 'visible' });
  return { context, page };
}

async function save(page, name) {
  const target = path.join(outputDir, name);
  await page.screenshot({ path: target, fullPage: true });
  console.log(target);
}

async function main() {
  const browser = await chromium.launch({ headless: true, executablePath });
  try {
    {
      const { context, page } = await openPage(
        browser,
        {
          mock_desktop: '1',
          mock_login: '1',
          mock_clean: '1',
          mock_robot_id: 'S1-PRD-STOCK-LOGIN',
        },
        'local-login-form'
      );
      await save(page, '01-stock-login-consent.png');
      await page.getByTestId('local-login-privacy-link').click();
      await page.getByTestId('privacy-policy-dialog').waitFor({
        state: 'visible',
      });
      await save(page, '02-stock-policy-dialog.png');
      await context.close();
    }

    {
      const { context, page } = await openPage(
        browser,
        {
          mock_desktop: '1',
          mock_clean: '1',
          mock_robot_id: 'S1-PRD-STOCK-USER-MENU',
        },
        'app-sidebar-user-menu-trigger'
      );
      await page.getByTestId('app-sidebar-user-menu-trigger').hover();
      await page
        .getByTestId('app-sidebar-privacy-policy-button')
        .waitFor({ state: 'visible' });
      await save(page, '03-stock-user-privacy-entry.png');
      await page.getByTestId('app-sidebar-privacy-policy-button').click();
      await page
        .getByTestId('privacy-policy-dialog')
        .waitFor({ state: 'visible' });
      await context.close();

      const stockSettings = await openPage(
        browser,
        {
          mock_desktop: '1',
          mock_clean: '1',
          settings: 'privacy',
          mock_robot_id: 'S1-PRD-STOCK-SETTINGS-CHECK',
        },
        'settings-page'
      );
      if (await stockSettings.page.getByTestId('settings-nav-privacy').count()) {
        throw new Error('Stock settings still contains a privacy entry');
      }
      await stockSettings.context.close();
    }

    {
      const initScript = () => {
        localStorage.setItem(
          'astribot.robot_privacy.store.v2',
          JSON.stringify({
            state: {
              acceptedPolicyVersion: 'v1.0',
              acceptedAt: '2026-07-01T00:00:00.000Z',
              pendingConsentReason: 'first_consent',
              thirdPartyModelEnabled: true,
              sensorAuthorizations: { microphone: false, camera: false },
              sensorAuthorizationPrompted: {
                microphone: false,
                camera: false,
              },
              lastInvalidatedPolicyVersion: null,
            },
            logs: [],
          })
        );
      };
      const { context, page } = await openPage(
        browser,
        {
          mock_desktop: '1',
          mock_login: '1',
          mock_policy_version: 'v2.0',
        },
        'local-login-privacy-update-notice',
        initScript
      );
      await save(page, '04-stock-policy-update-login.png');
      await context.close();
    }

    {
      const { context, page } = await openPage(
        browser,
        {
          mock_desktop: '1',
          mock_login: '1',
          mock_clean: '1',
          privacy_release: 'voice',
          mock_robot_id: 'S1-PRD-VOICE-POLICY',
        },
        'local-login-form'
      );
      await page.getByTestId('local-login-privacy-link').click();
      await page.getByTestId('privacy-policy-dialog').waitFor({
        state: 'visible',
      });
      await save(page, '05-voice-policy-dialog.png');
      await context.close();
    }

    {
      const { context, page } = await openPage(
        browser,
        {
          mock_desktop: '1',
          mock_clean: '1',
          privacy_release: 'voice',
          settings: 'privacy',
          mock_robot_id: 'S1-PRD-VOICE-SETTINGS',
        },
        'privacy-settings-panel'
      );
      const panel = page.getByTestId('privacy-settings-panel');
      const text = await panel.innerText();
      if (!text.includes('麦克风（音频采集）')) {
        throw new Error('Voice microphone control missing');
      }
      if (!text.includes('第三方大模型服务')) {
        throw new Error('Voice model service control missing');
      }
      if (text.includes('摄像头（图像采集）')) {
        throw new Error('Voice privacy page still contains a camera switch');
      }
      if (text.includes('隐私政策')) {
        throw new Error('Voice settings still contains a privacy policy entry');
      }
      await save(page, '06-voice-privacy-settings.png');
      await page.getByTestId('privacy-microphone-switch').click();
      await page
        .getByTestId('privacy-microphone-authorization-dialog')
        .waitFor({ state: 'visible' });
      await save(page, '07-voice-microphone-authorization.png');
      await context.close();
    }

    {
      const { context, page } = await openPage(
        browser,
        {
          mock_desktop: '1',
          mock_clean: '1',
          privacy_release: 'voice',
          mock_robot_id: 'S1-PRD-VOICE-AI',
        },
        'ai-assistant-trigger'
      );
      await page.getByTestId('ai-assistant-trigger').click();
      await page.getByTestId('ai-assistant-panel').waitFor({ state: 'visible' });
      await page.getByRole('button', { name: '机器人当前状态怎么样' }).click();
      await page.getByTestId('ai-generated-label').waitFor({ state: 'visible' });
      await save(page, '08-voice-ai-generated-label.png');
      await context.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
