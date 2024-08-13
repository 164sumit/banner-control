'use client'
import { BannerData, getBannerData, updateBanner } from '@/actions/banner.action'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'

import { FaCog } from 'react-icons/fa'

export default function BannerControl() {
    const [loading,setLoading] = useState<boolean>(false);
  const [bannerData, setBannerData] = useState<BannerData>({
    isVisible: true,
    description: '',
    timer: 0,
    link: '',
  })
  const [dashboardData, setDashboardData] = useState<BannerData>({
    isVisible: true,
    description: '',
    timer: 0,
    link: '',
  })
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [showDashboard, setShowDashboard] = useState(false)
  useEffect(() => {
    const fetchBannerData = async () => {
      setLoading(true)
      await getBannerData().then((data) => {
        setTimeLeft(data.timer)
        setBannerData(data)
        setDashboardData(data)
      }).catch((error) => {
        alert(error.message)
      }).finally(() => {
        setLoading(false)
      })
    }
    fetchBannerData()
  }, [])

  useEffect(() => {
    if (bannerData.isVisible && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, bannerData.isVisible])

  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateBanner(dashboardData).then(()=>{

        alert('Banner updated successfully!')
        setShowDashboard(false)
        setTimeLeft(dashboardData.timer);
        setBannerData(dashboardData);
    }).catch((error)=>{
        alert(error.message)
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setDashboardData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    }))
  }
  if(loading){
    return (
        <div className="loader">
            {/* Your loader/spinner component */}
            <p>Loading...</p>
        </div>
    );
  }
 


  return (
    <div className="relative">
      {timeLeft>0&&bannerData.isVisible && (
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md mb-4">
          <p className="text-lg">{bannerData.description}</p>
          <p className="text-sm mt-2">Time left: {timeLeft} seconds</p>
          <a href={bannerData.link} target="_blank" rel="noopener noreferrer" className="text-white underline mt-2 inline-block">
            Learn More
          </a>
        </div>
      )}

      <button
        onClick={() => setShowDashboard(!showDashboard)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg"
      >
        <FaCog size={24} />
      </button>

      {showDashboard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-4">Banner Control Dashboard</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isVisible"
                  checked={dashboardData.isVisible}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>Banner Visible</label>
              </div>
              <div>
                <label className="block mb-1">Description:</label>
                <input
                  type="text"
                  name="description"
                  value={dashboardData.description}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block mb-1">Timer (seconds):</label>
                <input
                  type="number"
                  name="timer"
                  value={dashboardData.timer}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block mb-1">Link:</label>
                <input
                  type="url"
                  name="link"
                  value={dashboardData.link}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowDashboard(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}