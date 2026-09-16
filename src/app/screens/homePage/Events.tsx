import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { plans } from "../../../lib/data/plans";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

SwiperCore.use([Autoplay, Navigation, Pagination]);

export default function Events() {
  return (
    <div className="events-frame">
      <Stack className="events-main">
        {/* Header Section */}
        <Box className="category-header-wrapper">
          <div className="category-badge-pill">
            <span className="pulse-dot" />
            <span>COMMUNITY CALENDAR</span>
          </div>
          <Box className="category-title">
            MOTOLAB <span className="highlight-cyan">EVENTS</span>
          </Box>
        </Box>

        {/* Swiper Slider */}
        <Swiper
          className="events-info swiper-wrapper"
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {plans.map((value, number) => {
            return (
              <SwiperSlide
                key={number}
                className="events-info-frame cyber-event-card"
              >
                <div className="events-img-wrapper">
                  <div className="event-badge">LIVE TRACK DAY</div>
                  <img
                    src={value.img}
                    alt={value.title}
                    className="events-img"
                  />
                  <div className="overlay-gradient" />
                </div>

                <Box className="events-desc">
                  <Box className="events-bott">
                    <Box className="bott-left">
                      <div className="event-title-speaker">
                        <strong className="event-title">{value.title}</strong>
                        <div className="event-organizator">
                          <img
                            src="/img/speaker.svg"
                            alt="speaker"
                            className="organizer-icon"
                          />
                          <p className="spec-text-author">{value.author}</p>
                        </div>
                      </div>

                      <p className="text-desc">{value.desc}</p>

                      <div className="bott-info">
                        <div className="bott-info-main">
                          <img
                            src="/icons/calendar.svg"
                            alt="calendar"
                            className="meta-icon"
                          />
                          <span>{value.date}</span>
                        </div>
                        <div className="bott-info-main">
                          <img
                            src="/icons/location.svg"
                            alt="location"
                            className="meta-icon"
                          />
                          <span>{value.location}</span>
                        </div>
                      </div>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Custom Navigation Controls */}
        <Box className="prev-next-frame">
          <div className="swiper-button-prev custom-nav-btn">
            <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
          </div>
          <div className="dot-frame-pagination swiper-pagination"></div>
          <div className="swiper-button-next custom-nav-btn">
            <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
          </div>
        </Box>
      </Stack>
    </div>
  );
}
