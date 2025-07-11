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
        <label htmlFor="client-id">Imgur Client-ID</label>
        <input
          id="client-id"
          type="text"
          value={this.state.clientId}
          onChange={e => this.setState({ clientId: e.target.value })}
          placeholder="请输入你的 Imgur Client-ID"
        />
        <div className="tab-actions">
          <button className="save-btn" onClick={this.saveClientId}>💾 保存</button>
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
            color: #ccc;
        }

        .settings-modal {
            position: fixed;
            top: 12%;
            left: 50%;
            transform: translateX(-50%);
            background: #1e1e1e;
            border-radius: 12px;
            border: 1px solid #333;
            width: 480px;
            max-height: 80vh;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            color: #e0e0e0;
        }

        .modal-header {
            padding: 1rem 1.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #2a2a2a;
            border-bottom: 1px solid #333;
        }

        .close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            padding: 0 6px;
            color: #999;
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
            width: 140px;
            background: #2a2a2a;
            border-right: 1px solid #333;
            display: flex;
            flex-direction: column;
        }

        .tab-menu button {
            padding: 0.75rem 1rem;
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
            padding: 1.2rem;
            overflow-y: auto;
        }

        .tab-content {
            display: flex;
            flex-direction: column;
        }

        .tab-content label {
            font-weight: 500;
            margin-bottom: 6px;
            color: #ccc;
        }

        .tab-content input {
            padding: 8px 10px;
            font-size: 14px;
            background: #2a2a2a;
            border: 1px solid #444;
            border-radius: 6px;
            color: #eee;
            margin-bottom: 12px;
            outline: none;
            transition: border 0.2s ease;
        }

        .tab-content input:focus {
            border-color: #1890ff;
        }

        .tab-actions {
            margin-top: 4px;
        }

        .save-btn {
            background: #1890ff;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: background 0.2s ease;
        }

        .save-btn:hover {
            background: #40a9ff;
        }
        `}</style>
      </>
    )
  }
}

export default PageGlobalSettings
