import React from 'react'

const TABS = [
  { id: 'imgur', name: 'Imgur 设置' },
  { id: 'general', name: '通用设置' },
  // 未来可加更多
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
        <label htmlFor="client-id">Imgur Client-ID：</label>
        <input id="client-id"
          type="text"
          value={this.state.clientId}
          onChange={e => this.setState({ clientId: e.target.value })}
          placeholder="请输入你的 Imgur Client-ID"
        />
        <div className="tab-actions">
          <button onClick={this.saveClientId}>保存</button>
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
        <button
          className="settings-button"
          onClick={this.toggleSettings}
          title="全局设置"
        >
          ⚙️
        </button>

        {showSettings && (
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
        )}

        <style jsx>{`
          .settings-button {
            font-size: 18px;
            background: none;
            border: none;
            cursor: pointer;
          }

          .settings-modal {
            position: fixed;
            top: 15%;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            border: 1px solid #ccc;
            width: 420px;
            z-index: 1000;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          }

          .modal-header {
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #eee;
          }

          .close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
          }

          .settings-body {
            display: flex;
          }

          .tab-menu {
            width: 120px;
            border-right: 1px solid #eee;
            display: flex;
            flex-direction: column;
          }

          .tab-menu button {
            padding: 0.75rem;
            background: none;
            border: none;
            text-align: left;
            cursor: pointer;
            font-size: 14px;
          }

          .tab-menu button.active {
            background: #f0f0f0;
            font-weight: bold;
          }

          .tab-panel {
            flex: 1;
            padding: 1rem;
          }

          .tab-content {
            display: flex;
            flex-direction: column;
          }

          .tab-content input {
            margin-top: 0.5rem;
            padding: 6px;
          }

          .tab-actions {
            margin-top: 1rem;
          }
        `}</style>
      </>
    )
  }
}

export default PageGlobalSettings
