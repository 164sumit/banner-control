'use client'
import { BannerData, getBannerData } from '@/actions/banner.action'
import { useState, useEffect } from 'react'


export default function Banner() {
  const [bannerData, setBannerData] = useState<BannerData | null>(null)
  const [timeLeft, setTimeLeft] = useState<number>(0)

  useEffect(() => {
    fetchBannerData()
  }, [])

  useEffect(() => {
    if (bannerData && bannerData.isVisible && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [bannerData, timeLeft])

  const fetchBannerData = async () => {
    const data = await getBannerData()
    setBannerData(data)
    setTimeLeft(data.timer)
  }

  if (!bannerData || !bannerData.isVisible) return null

  return (
    <div className="banner">
      <p>{bannerData.description}</p>
      <p>Time left: {timeLeft} seconds</p>
      <a href={bannerData.link} target="_blank" rel="noopener noreferrer">Learn More</a>
    </div>
  )
}