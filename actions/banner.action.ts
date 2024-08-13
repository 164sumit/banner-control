'use server'

import prisma from '../lib/prisma'

export interface BannerData {
  isVisible: boolean
  description: string
  timer: number
  link: string
}

export async function getBannerData(): Promise<BannerData> {
  const banner = await prisma.banner.findFirst()
  return banner || { isVisible: false, description: '', timer: 0, link: '' }
}

export async function updateBanner(data: BannerData) {
  const banner = await prisma.banner.findFirst()
  if (banner) {
    return prisma.banner.update({
      where: { id: banner.id },
      data,
    })
  } else {
    return prisma.banner.create({ data })
  }
}