import React from 'react'
import { View } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './carouselCardItem'


const CarouselCards = () => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef<any>({})
  const data = [
    { title: 'Chicken', imgUrl: require('../../../../modules/assets/svgimages/HomeSvgs/carouselimages/image1.png') },
    { title: 'Fish', imgUrl: require('../../../../modules/assets/svgimages/HomeSvgs/carouselimages/image2.png') },
    { title: 'Mutton', imgUrl: require('../../../../modules/assets/svgimages/HomeSvgs/carouselimages/image3.png') },
    { title: 'Beef', imgUrl: require('../../../../modules/assets/svgimages/HomeSvgs/carouselimages/image4.png') },
    { title: 'Coldcuts', imgUrl: require('../../../../modules/assets/svgimages/HomeSvgs/carouselimages/image5.png') },
  ];
  return (
    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
      <Carousel
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={400}
        itemWidth={300}
        loop
        autoplay
        onSnapToItem={(index) => setIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        // carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
          marginBottom: 20
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  )
}

export default CarouselCards;