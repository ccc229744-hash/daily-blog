const CACHE_NAME = 'daily-blog-v1'
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
]

// 安装事件 - 缓存静态资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    })
  )
  self.clients.claim()
})

// 请求拦截
self.addEventListener('fetch', (event) => {
  // 只处理 GET 请求
  if (event.request.method !== 'GET') return

  // API 请求 - 网络优先
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(JSON.stringify({ error: 'Offline' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        })
      })
    )
    return
  }

  // 图片资源 - 缓存优先
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse.ok) {
            const cache = caches.open(CACHE_NAME)
            cache.then((c) => c.put(event.request, networkResponse.clone()))
          }
          return networkResponse
        })
        return cachedResponse || fetchPromise
      })
    )
    return
  }

  // HTML 页面 - 网络优先，失败则缓存
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // 缓存成功的响应
        if (response.ok) {
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone)
          })
        }
        return response
      })
      .catch(() => {
        // 网络失败，返回缓存
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || caches.match('/offline')
        })
      })
  )
})

// 后台同步
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData())
  }
})

async function syncData() {
  // 同步离线数据到服务器
  const pendingRequests = await getPendin gRequests()
  for (const request of pendingRequests) {
    try {
      await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      })
      await removePendingRequest(request.id)
    } catch (error) {
      console.error('Sync failed:', error)
    }
  }
}

// 推送通知
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {}

  event.waitUntil(
    self.registration.showNotification(data.title || '每日博客', {
      body: data.body || '有新内容更新',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      data: data.url || '/',
    })
  )
})

// 通知点击
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    clients.openWindow(event.notification.data)
  )
})

// 辅助函数
async function getPendingRequests() {
  // 从 IndexedDB 获取待同步请求
  return []
}

async function removePendingRequest(id: string) {
  // 从 IndexedDB 删除已同步请求
}
