import React from 'react'

const TABS = [
  { id: 'imgur', name: 'Imgur 设置' },
  { id: 'general', name: '通用设置' },
]

class PageGlobalSettings extends React.Component {
  state = {
    showSettings: false,
    activeTab: 'imgur',
    clientId: '',
  }

  componentDidMount() {
    const saved = localStorage.getItem('imgur_client_id')
    if (saved) {
      this.setState({ clientId: saved })
    }
  }

  toggleSettings = () => {
    this.setState(prev => ({ showSettings: !prev.showSettings }))
  }

  switchTab = id => this.setState({ activeTab: id })

  saveClientId = () => {
    const { clientId } = this.state
    if (clientId) {
      localStorage.setItem('imgur_client_id', clientId)
      alert('Client-ID 已保存')
    }
  }

  renderImgurTab() {
    return (
      <div className="tab-content">
        <div className="form-group1">
          <label htmlFor="client-id" style={{ background: 'red' }}>Imgur Client-ID</label>
          <input
            id="client-id"
            type="text"
            value={this.state.clientId}
            onChange={e => this.setState({ clientId: e.target.value })}
            placeholder="请输入你的 Imgur Client-ID"
          />
        </div>
        <div className="tab-actions">
          <button className="fluent-button" onClick={this.saveClientId}>保存</button>
        </div>
      </div>
    )
  }

  renderGeneralTab() {
    return (
      <div className="tab-content">
        <p>暂未添加通用设置。</p>
      </div>
    )
  }

  render() {
    const { showSettings, activeTab } = this.state

    return (
      <>
        <button className="settings-button" onClick={this.toggleSettings} title="全局设置">
          ⚙️
        </button>

        {showSettings && (
          <>
            <div
              className="modal-backdrop"
              role="button"
              tabIndex="0"
              onClick={this.toggleSettings}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && this.toggleSettings()}
            ></div>
            <div className="settings-modal">
              <div className="modal-header">
                <h3>全局设置</h3>
                <button className="close" onClick={this.toggleSettings}>×</button>
              </div>
              <div className="settings-body">
                <div className="tab-menu">
                  {TABS.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => this.switchTab(tab.id)}
                      className={tab.id === activeTab ? 'active' : ''}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
                <div className="tab-panel">
                  {activeTab === 'imgur' && this.renderImgurTab()}
                  {activeTab === 'general' && this.renderGeneralTab()}
                </div>
              </div>
            </div>
          </>
        )}

        <style jsx >{`
          .settings-button {
            font-size: 18px;
            background: none;
            border: none;
            cursor: pointer;
            color: #ccc;
          }

          .modal-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
          }

          .settings-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #1e1e1e;
            border-radius: 16px;
            border: 1px solid #333;
            width: 640px;
            max-height: 85vh;
            z-index: 1000;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            color: #e0e0e0;
          }

          .modal-header {
            padding: 1rem 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #252525;
            border-bottom: 1px solid #333;
          }

          .close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #aaa;
            transition: color 0.2s ease;
          }

          .close:hover {
            color: #ff4d4f;
          }

          .settings-body {
            display: flex;
            flex: 1;
            overflow: hidden;
          }

          .tab-menu {
            width: 160px;
            background: #2a2a2a;
            border-right: 1px solid #333;
            display: flex;
            flex-direction: column;
          }

          .tab-menu button {
            padding: 0.9rem 1.2rem;
            background: none;
            border: none;
            text-align: left;
            cursor: pointer;
            font-size: 14px;
            color: #ccc;
            transition: background 0.2s ease, color 0.2s ease;
          }

          .tab-menu button:hover {
            background: #333;
            color: #fff;
          }

          .tab-menu button.active {
            background: #1890ff;
            color: #fff;
            font-weight: bold;
          }

          .tab-panel {
            flex: 1;
            padding: 1.5rem;
            overflow-y: auto;
          }

          .tab-content {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          /* 标签和输入框垂直布局 */
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px; /* 间距 */
            margin-bottom: 16px;
          }

          .form-group label {
            font-weight: 500;
            color: #ccc;
            display: block; /* 标签单独一行 */
            margin-bottom: 6px; /* 标签与输入框间距 */
          }

          .form-group input {
            padding: 12px 14px;
            font-size: 14px;
            background: #2a2a2a;
            border: 1px solid #555;
            border-radius: 8px;
            color: #eee;
            outline: none;
            transition: border 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
            width: 100%; /* 输入框宽度填满容器 */
            box-sizing: border-box;
          }

          .form-group input:focus {
            border-color: #1890ff;
            background: #333;
            box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.3);
          }

          .tab-actions {
            margin-top: 0.5rem;
            display: flex;
            justify-content: flex-end; /* 按钮右对齐 */
          }

          /* Fluent按钮样式 */
          .fluent-button {
            background: linear-gradient(135deg, #0078d7, #1890ff);
            color: #fff;
            padding: 10px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.25s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            position: relative;
            overflow: hidden;
          }

          /* Fluent按钮悬停效果 */
          .fluent-button:hover {
            background: linear-gradient(135deg, #106ebe, #40a9ff);
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
          }

          /* Fluent按钮按下效果 */
          .fluent-button:active {
            transform: translateY(1px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          /* Fluent按钮的微光效果 */
          .fluent-button::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: rgba(255, 255, 255, 0.1);
            transform: rotate(30deg);
            transition: all 0.5s ease;
            pointer-events: none;
          }

          .fluent-button:hover::after {
            transform: rotate(30deg) translate(50%, 50%);
          }
        `}</style>
      </>
    )
  }
}

export default PageGlobalSettings