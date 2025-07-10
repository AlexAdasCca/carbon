import React from 'react'
import Page from '../components/Page'

function Contributors() {
  const [contributors, setContributors] = React.useState([])

  React.useEffect(() => {
    fetch('https://api.github.com/repos/carbon-app/carbon/contributors?per_page=100')
      .then(response => response.json())
      .then(contributors =>
        setContributors(contributors.filter(contributor => !contributor.login.endsWith('[bot]')))
      )
  }, [])

  return (
    <div>
      {contributors.map(contributor => (
        <a key={contributor.id} href={contributor.html_url} target="_blank" rel="noreferrer">
          <img alt={contributor.login} className="contributor" src={contributor.avatar_url} />
        </a>
      ))}
      <style jsx>
        {`
          .contributor {
            border-radius: 50%;
            border: 2px solid white;
            width: 32px;
            height: 32px;
            margin-right: 12px;
            transition: all 300ms ease;
            margin-bottom: 8px;
          }

          .contributor:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </div>
  )
}

export default function About() {
  return (
    <Page>
      <div className="about">
        <div className="mb4">
          <h2>此工具有什么用？</h2>
          <p> Carbon 允许您创建和共享包含源代码的精美图像</p>
          <p>
            您知道你在推特上看到的所有代码截图吗？虽然代码通常令人印象深刻，
            但我们认为在美学方面还有改进的空间。您还在等什么？快去尝试一下，
            给您所有的开发人员和设计师朋友们留下深刻的印象。{' '}
            <span role="img" aria-label="Palette">
              🎨
            </span>
          </p>
        </div>
        <div className="mb4">
          <h2>谁在使用它？</h2>
          <p>
              Carbon 每天被数千名开发人员使用，其中包括以下权威：
            <img
              className="mt2"
              width="508px"
              src="/static/svg/open-source-companies-2.svg"
              alt="Companies that trust Carbon: Google, Airbnb, GitHub, Coinbase, and Microsoft"
            />
          </p>
        </div>
        <div className="mb4">
          <h2>我应该怎么使用它？</h2>
          <h4 className="mb0 mt3">导入</h4>
          <p className="mb1 mt2">有几种不同的方法可以将代码导入Carbon：</p>
          <ul className="mt0 mb3">
            <li>将文件拖放至编辑器</li>
            <li>
              将 GitHub Gist 的 ID 附加到 url (
              <a className="link" href="/3208813b324d82a9ebd197e4b1c3bae8">
                示例链接
              </a>
              )
            </li>
            <li>直接粘贴您的代码</li>
          </ul>
          <h4 className="mb0 mt4">个性化</h4>
          <p className="mt2 mb3">
            将所有代码导入 Carbon 后，您可以通过更改语法主题、背景颜色/图像、窗口主题或填充来自定义图像。
          </p>
          <p className="mt2 mb3">
            您甚至可以将图像文件放到编辑器中，为该图像设置背景。
            试试看！
          </p>
          <h4 className="mb0 mt4">导出/共享</h4>
          <p className="mt2 mb3">
            自定义图像后，您可以在推特上发布图像链接，或者直接保存为文件。
          </p>
          <p className="mt2 mb3">
            如果您使用“推特”按钮，Carbon 将自动使您的图像可访问。
            但是，如果你想手动在推特上发布你的 Carbon 图像，请查看 (
            <a
              className="link"
              href="https://help.twitter.com/en/using-twitter/picture-descriptions"
            >
              “如何让你的推特图片可访问”
            </a>
            ).
          </p>
          <p className="mt2 mb3">
            如果你在帖子中包含一个Carbon图像，辅助技术将无法看到源代码——无法放大或复制它，
            等等。请考虑在源代码中添加另一个元素作为文本，例如 在图片的下方显示 (
            <a
              className="link"
              href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details"
            >
              HTML 细节元素
            </a>
            ) 。
          </p>
          <h4 className="mb0 mt4" id="shortcuts">
            键盘快捷方式
          </h4>
          <table className="mt2 mb3">
            <tbody>
              <tr>
                <td>打开设置菜单</td>
                <td>
                  <kbd>⌘ /</kbd>
                </td>
              </tr>
              <tr>
                <td>导出为 PNG 图像</td>
                <td>
                  <kbd>⇧ ⌘ E</kbd>
                </td>
              </tr>
              <tr>
                <td>导出为 SVG 矢量图</td>
                <td>
                  <kbd>⇧ ⌘ S</kbd>
                </td>
              </tr>
              <tr>
                <td>保存预设</td>
                <td>
                  <kbd>⌥ S</kbd>
                </td>
              </tr>
              <tr>
                <td>复制图像至剪贴板</td>
                <td>
                  <kbd>⇧ ⌘ C</kbd>
                </td>
              </tr>
              <tr>
                <td>重置设置</td>
                <td>
                  <kbd>⇧ ⌘ \</kbd>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2>我想让这里变得更好</h2>
          <p>
            <a className="link" href="https://github.com/carbon-app/carbon#contribute--support">
              随时欢迎贡献者！
            </a>
          </p>
          <br />
          <Contributors />
        </div>
      </div>
      <style jsx>
        {`
          .about {
            font-size: 16px;
            max-width: 632px;
            margin: 0 auto var(--x4);
          }

          @media (max-width: 768px) {
            .about {
              max-width: 90vw;
            }
          }

          img {
            max-width: 100%;
          }

          h2 {
            font-weight: bold;
            font-size: 32px;
          }
          h4 {
            font-weight: bold;
          }

          p,
          li {
            color: #fff;
          }

          ul {
            list-style-position: inside;
            list-style-type: circle;
          }

          span {
            color: #fff;
          }

          td {
            padding: 0.25rem 0;
          }

          kbd {
            margin-left: var(--x3);
            letter-spacing: 0.1em;
          }
        `}
      </style>
    </Page>
  )
}
