/**
 * XSS 防护工具函数
 */

// HTML 标签白名单
const ALLOWED_TAGS = new Set([
  'p', 'br', 'strong', 'em', 'u', 's', 'blockquote',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li',
  'a', 'img', 'code', 'pre',
  'div', 'span', 'hr',
])

// HTML 属性白名单
const ALLOWED_ATTRIBUTES = new Set([
  'href', 'src', 'alt', 'title', 'target', 'rel',
  'class', 'id', 'style',
])

// 危险协议
const DANGEROUS_PROTOCOLS = ['javascript:', 'data:', 'vbscript:']

/**
 * 清理 HTML 内容，防止 XSS 攻击
 */
export function sanitizeHTML(html: string): string {
  if (!html) return ''

  // 创建临时 DOM 元素
  const temp = document.createElement('div')
  temp.innerHTML = html

  // 递归清理
  const cleanNode = (node: Node) => {
    // 处理元素节点
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element
      const tagName = element.tagName.toLowerCase()

      // 检查标签是否在白名单中
      if (!ALLOWED_TAGS.has(tagName)) {
        // 保留子节点
        const fragment = document.createDocumentFragment()
        while (element.firstChild) {
          fragment.appendChild(cleanNode(element.firstChild))
        }
        return fragment
      }

      // 清理属性
      const attributes = Array.from(element.attributes)
      for (const attr of attributes) {
        const attrName = attr.name.toLowerCase()
        const attrValue = attr.value

        // 检查属性是否在白名单中
        if (!ALLOWED_ATTRIBUTES.has(attrName)) {
          element.removeAttribute(attrName)
          continue
        }

        // 检查 href/src 是否包含危险协议
        if (['href', 'src'].includes(attrName)) {
          const hasDangerousProtocol = DANGEROUS_PROTOCOLS.some(protocol =>
            attrValue.toLowerCase().startsWith(protocol)
          )
          if (hasDangerousProtocol) {
            element.removeAttribute(attrName)
          }
        }

        // 清理 on* 事件处理器
        if (attrName.startsWith('on')) {
          element.removeAttribute(attrName)
        }
      }

      // 递归清理子节点
      const children = Array.from(element.childNodes)
      for (const child of children) {
        cleanNode(child)
      }
    }

    // 文本节点直接返回
    return node
  }

  // 清理根节点
  const cleaned = cleanNode(temp)

  return (cleaned as Element).innerHTML
}

/**
 * 清理用户输入
 */
export function sanitizeInput(input: string): string {
  if (!input) return ''

  // 移除 HTML 标签
  const withoutTags = input.replace(/<[^>]*>/g, '')

  // 转义特殊字符
  return withoutTags
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * 验证 URL 安全性
 */
export function isValidURL(url: string): boolean {
  try {
    const parsed = new URL(url)
    const protocol = parsed.protocol.toLowerCase()

    // 只允许 http/https
    return protocol === 'http:' || protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * CSRF Token 生成
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * 密码强度检查
 */
export function checkPasswordStrength(password: string): {
  score: number
  feedback: string[]
} {
  const feedback: string[] = []
  let score = 0

  // 长度检查
  if (password.length >= 8) score++
  else feedback.push('密码长度至少 8 位')

  if (password.length >= 12) score++
  if (password.length >= 16) score++

  // 字符类型检查
  if (/[a-z]/.test(password)) score++
  else feedback.push('包含小写字母')

  if (/[A-Z]/.test(password)) score++
  else feedback.push('包含大写字母')

  if (/[0-9]/.test(password)) score++
  else feedback.push('包含数字')

  if (/[^a-zA-Z0-9]/.test(password)) score++
  else feedback.push('包含特殊字符')

  return {
    score: Math.min(score, 6),
    feedback: feedback.length > 0 ? feedback : ['密码强度很好'],
  }
}
