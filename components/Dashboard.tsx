'use client'
import { BannerData, getBannerData, updateBanner } from '@/actions/banner.action'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'


export default function Dashboard() {
  const [bannerData, setBannerData] = useState<BannerData>({
    isVisible: true,
    description: '',
    timer: 0,
    link: '',
  })

  useEffect(() => {
    fetchBannerData()
  }, [])

  const fetchBannerData = async () => {
    const data = await getBannerData()
    setBannerData(data)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateBanner(bannerData)
    alert('Banner updated successfully!')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setBannerData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Banner Control Dashboard</h2>
      <div>
        <label>
          <input
            type="checkbox"
            name="isVisible"
            checked={bannerData.isVisible}
            onChange={handleChange}
          />
          Banner Visible
        </label>
      </div>
      <div>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={bannerData.description}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Timer (seconds):
          <input
            type="number"
            name="timer"
            value={bannerData.timer}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Link:
          <input
            type="url"
            name="link"
            value={bannerData.link}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Update Banner</button>
    </form>
  )
}