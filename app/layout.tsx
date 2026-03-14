import type { Metadata, Viewport } from 'next'
import './globals.css'
import BackToTop from './components/BackToTop'
import MobileNav from './components/MobileNav'
import CustomerService from './components/CustomerService'
import AnnouncementBar from './components/AnnouncementBar'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: '我的每日博客',
  description: '记录每一天的思考与成长',
  keywords: '博客，个人成长，思考，学习，技术',
  authors: [{ name: '博主' }],
  other: {
    'google-site-verification': 'googled5246ebe40dfd2a1.html',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* SEO Structured Data - Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "每日博客",
              "description": "记录每一天的思考与成长",
              "author": {
                "@type": "Person",
                "name": "贝贝",
                "url": "https://yourblog.com/about"
              },
              "publisher": {
                "@type": "Organization",
                "name": "每日博客",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://openclaw.ai/logo.png",
                  "width": 600,
                  "height": 600
                }
              },
              "url": "https://beibei.openclaw.ai",
              "inLanguage": "zh-CN",
              "sameAs": [
                "https://github.com/openclaw/openclaw",
                "https://weibo.com/openclaw"
              ]
            }),
          }}
        />
        
        {/* 百度统计 - 替换成你的统计代码 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?YOUR_BAIDU_TONGJI_ID";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
              })();
            `,
          }}
        />
      </head>
      <body style={{ margin: 0, fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif` }}>
        {/* 顶部公告栏 */}
        <AnnouncementBar />
        
        {children}
        
        {/* 返回顶部按钮 */}
        <BackToTop />
        
        {/* 移动端底部导航 */}
        <MobileNav />
        
        {/* 客服浮窗 */}
        <CustomerService />
      </body>
    </html>
  )
}
