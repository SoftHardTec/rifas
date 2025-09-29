import { Carousel } from "@mantine/carousel";

export default function ImageCarousel() {
  return (
    <Carousel
      loop
      withIndicators
      h="100%"
      className="bg-gray-300 dark:bg-dark-400"
    >
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
    </Carousel>
  );
}
