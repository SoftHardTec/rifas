import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import NextImage from "next/image";
import { Image } from "@mantine/core";

export default function ImageCarousel() {
  // Creamos la instancia del plugin. No es necesario usar useRef si solo se pasa al carrusel.
  const autoplay = Autoplay({
    delay: 2000,
    stopOnInteraction: false, // El autoplay no se detiene si el usuario interactúa con el carrusel
    stopOnMouseEnter: true, // El autoplay se detiene al pasar el ratón por encima
  });
  return (
    <Carousel
      height={400}
      plugins={[autoplay]}
      variant="transparent"
      styles={{
        indicator: {
          width: "auto",
          height: 4,
          transition: "width 250ms ease",
          "&[data-active]": {
            width: 40,
          },
        },
      }}
    >
      <Carousel.Slide>
        <Image
          component={NextImage}
          src={"/flyer.jpg"}
          alt="Rifa principal"
          fill
          style={{ objectFit: "contain" }}
        />
      </Carousel.Slide>
    </Carousel>
  );
}
