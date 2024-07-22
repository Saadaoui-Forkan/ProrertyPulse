import FeaturedProperties from '@/components/FeaturedProperties'
import Hero from '@/components/Hero'
import HomeProperties from '@/components/HomeProperties'
import InfoBoxes from '@/components/InfoBoxes'

const HomePage = async() => {
  return (
    <div>
      <Hero/>
      <InfoBoxes/>
      <FeaturedProperties/>
      <HomeProperties/>
    </div>
  )
}

export default HomePage