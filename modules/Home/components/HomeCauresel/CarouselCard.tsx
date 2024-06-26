import React from 'react'
import { View } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './carouselCardItem'


const CarouselCards = () => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef<any>({})
  const data = [
    { title: 'Chicken', imgUrl: require('../../../../modules/assets/svgimages/HomeSvgs/carouselimages/Chickenimg.png') },
    { title: 'Fish', imgUrl: require('../../../../modules/assets/svgimages/HomeSvgs/carouselimages/Chickenimg.png') },
    { title: 'Mutton', imgUrl: require('../../../../modules/assets/svgimages/HomeSvgs/carouselimages/Chickenimg.png') },
    { title: 'Beef', imgUrl: require('../../../../modules/assets/svgimages/HomeSvgs/carouselimages/Chickenimg.png') },
    { title: 'Coldcuts', imgUrl: require('../../../../modules/assets/svgimages/HomeSvgs/carouselimages/Chickenimg.png') },
  ];
  return (
    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
      <Carousel
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={400}
        itemWidth={360}
        loop
        autoplay
        onSnapToItem={(index) => setIndex(index)}
        
      />
    </View>
  )
}

export default CarouselCards;