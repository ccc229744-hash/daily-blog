export default function PrivacyPage() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
    }}>
      <h1 style={{
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#1F1F1F',
        marginBottom: '40px',
        textAlign: 'center',
      }}>
        隐私政策
      </h1>

      <div style={{
        fontSize: '14px',
        color: '#595959',
        lineHeight: '1.75',
      }}>
        <p><strong>最后更新时间：</strong>2026 年 3 月 13 日</p>

        <p>我们非常重视用户的隐私保护。本隐私政策说明我们如何收集、使用、存储和保护您的个人信息。</p>

        <h2 style={{ fontSize: '20px', color: '#1F1F1F', marginTop: '32px', marginBottom: '16px' }}>一、信息收集</h2>
        <p>1.1 我们可能收集以下类型的信息：</p>
        <ul style={{ marginLeft: '20px' }}>
          <li><strong>设备信息：</strong>IP 地址、浏览器类型、操作系统等</li>
          <li><strong>使用数据：</strong>访问页面、停留时间、点击记录等</li>
          <li><strong>评论信息：</strong>昵称、邮箱（仅用于回复通知，不会公开）</li>
        </ul>

        <p>1.2 我们使用百度统计等第三方工具收集匿名访问数据，用于优化网站体验。</p>

        <h2 style={{ fontSize: '20px', color: '#1F1F1F', marginTop: '32px', marginBottom: '16px' }}>二、信息使用</h2>
        <p>我们使用收集的信息用于以下目的：</p>
        <ul style={{ marginLeft: '20px' }}>
          <li>分析和改进网站内容</li>
          <li>回复用户评论和留言</li>
          <li>防范欺诈和滥用行为</li>
          <li>遵守法律法规要求</li>
        </ul>

        <h2 style={{ fontSize: '20px', color: '#1F1F1F', marginTop: '32px', marginBottom: '16px' }}>三、信息共享</h2>
        <p>3.1 我们不会向任何第三方出售、出租或交易您的个人信息。</p>
        <p>3.2 以下情况除外：</p>
        <ul style={{ marginLeft: '20px' }}>
          <li>获得您的明确同意</li>
          <li>法律法规要求</li>
          <li>配合政府部门依法调查</li>
        </ul>

        <h2 style={{ fontSize: '20px', color: '#1F1F1F', marginTop: '32px', marginBottom: '16px' }}>四、信息保护</h2>
        <p>4.1 我们采取合理的安全措施保护您的信息，防止未经授权的访问、使用或泄露。</p>
        <p>4.2 我们使用 HTTPS 加密传输数据，确保信息安全。</p>
        <p>4.3 我们仅保留必要的信息，超出保留期限后会及时删除或匿名化处理。</p>

        <h2 style={{ fontSize: '20px', color: '#1F1F1F', marginTop: '32px', marginBottom: '16px' }}>五、Cookie 使用</h2>
        <p>5.1 我们使用 Cookie 来提升用户体验，例如记住您的偏好设置。</p>
        <p>5.2 您可以通过浏览器设置管理或禁用 Cookie，但这可能影响某些功能的正常使用。</p>

        <h2 style={{ fontSize: '20px', color: '#1F1F1F', marginTop: '32px', marginBottom: '16px' }}>六、您的权利</h2>
        <p>根据相关法律法规，您享有以下权利：</p>
        <ul style={{ marginLeft: '20px' }}>
          <li>访问、更正您的个人信息</li>
          <li>要求删除您的个人信息</li>
          <li>撤回同意</li>
          <li>投诉举报</li>
        </ul>

        <h2 style={{ fontSize: '20px', color: '#1F1F1F', marginTop: '32px', marginBottom: '16px' }}>七、政策更新</h2>
        <p>7.1 我们可能不时更新本隐私政策。</p>
        <p>7.2 更新后的政策将在本页面公布，重大变更会通过网站公告通知。</p>
        <p>7.3 您继续使用本网站即视为接受更新后的隐私政策。</p>

        <h2 style={{ fontSize: '20px', color: '#1F1F1F', marginTop: '32px', marginBottom: '16px' }}>八、联系我们</h2>
        <p>如您对本隐私政策有任何疑问、意见或建议，请通过以下方式联系我们：</p>
        <p>邮箱：beibei@openclaw.ai</p>
        <p>微信：beibei-ai</p>

        <p style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #D9D9D9', fontSize: '13px', color: '#8C8C8C' }}>
          我们承诺严格遵守《中华人民共和国网络安全法》《中华人民共和国个人信息保护法》等相关法律法规，保护您的个人信息安全。
        </p>
      </div>
    </div>
  )
}
