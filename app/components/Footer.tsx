'use client'

import Link from 'next/link'
import SiteStats from './SiteStats'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{
      background: '#FAFAFA',
      borderTop: '1px solid #D9D9D9',
      padding: '40px 20px',
      marginTop: '60px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        {/* 网站统计 */}
        <SiteStats />
        
        {/* 友情链接 */}
        <div style={{
          marginBottom: '20px',
          fontSize: '14px',
          color: '#595959',
        }}>
          <Link href="/about" style={{ color: '#595959', textDecoration: 'none', margin: '0 10px' }}>
            关于博主
          </Link>
          <span style={{ color: '#D9D9D9' }}>|</span>
          <Link href="/terms" style={{ color: '#595959', textDecoration: 'none', margin: '0 10px' }}>
            用户协议
          </Link>
          <span style={{ color: '#D9D9D9' }}>|</span>
          <Link href="/privacy" style={{ color: '#595959', textDecoration: 'none', margin: '0 10px' }}>
            隐私政策
          </Link>
          <span style={{ color: '#D9D9D9' }}>|</span>
          <Link href="/subscribe" style={{ color: '#595959', textDecoration: 'none', margin: '0 10px' }}>
            订阅更新
          </Link>
        </div>

        {/* 版权信息 */}
        <div style={{
          fontSize: '13px',
          color: '#8C8C8C',
          marginBottom: '10px',
        }}>
          © {currentYear} 我的每日博客 版权所有
        </div>

        {/* ICP 备案信息 */}
        <div style={{
          fontSize: '13px',
          color: '#8C8C8C',
          marginBottom: '10px',
        }}>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#8C8C8C', textDecoration: 'none' }}
          >
            京 ICP 备 20260314 号 -1
          </a>
        </div>

        {/* 公安联网备案 */}
        <div style={{
          fontSize: '13px',
          color: '#8C8C8C',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}>
          <a
            href="https://www.beian.gov.cn/portal/registerSystemInfo"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#8C8C8C', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <img 
              src="https://www.beian.gov.cn/img/ghs-icon.png" 
              alt="公安备案图标"
              style={{ width: '16px', height: '16px', verticalAlign: 'middle' }}
            />
            京公网安备 11010802026031 号
          </a>
        </div>

        {/* 网站安全联盟 */}
        <div style={{
          fontSize: '12px',
          color: '#8C8C8C',
          marginBottom: '15px',
        }}>
          <span style={{ 
            display: 'inline-block',
            padding: '2px 8px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#FFF',
            borderRadius: '12px',
            fontSize: '11px',
          }}>
            🔒 网站安全认证
          </span>
          <span style={{ 
            display: 'inline-block',
            padding: '2px 8px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: '#FFF',
            borderRadius: '12px',
            fontSize: '11px',
            marginLeft: '8px',
          }}>
            ✅ 实名认证
          </span>
        </div>

        {/* 温馨提示 */}
        <div style={{
          fontSize: '12px',
          color: '#8C8C8C',
          marginTop: '10px',
          padding: '10px',
          background: '#FFF',
          borderRadius: '4px',
          display: 'inline-block',
          border: '1px solid #E8E8E8',
        }}>
          💡 本站内容均为原创，如需转载请联系作者授权
        </div>

        {/* 举报入口 */}
        <div style={{
          fontSize: '12px',
          color: '#8C8C8C',
          marginTop: '15px',
        }}>
          <a
            href="https://www.12377.cn/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#8C8C8C', textDecoration: 'none' }}
          >
            🛡️ 违法和不良信息举报入口
          </a>
        </div>
      </div>
    </footer>
  )
}
