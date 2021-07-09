import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { WeatherType } from './enums/enums';
import ForecastPreview from './ForecastPreview';
import Slider, { LazyLoadTypes } from 'react-slick';

interface Forecast {
    temperature: number,
    date: Date,
    isHighFloodRisk: boolean,
    weatherType: WeatherType
}

const PreviewsContainer = styled.div`
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: auto;
    margin-bottom: 16px;
`;

const forecastPreviewWidth: number = 69.875;

export default function ForecastPreviews() {
    const [previews, setPreviews] = useState<Forecast[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const dayIndex = useRef<number>(0);
    const isMouseOverContainer = useRef<boolean>(false);

    function loadNewDates(dates?: number): void {
        if (scrollContainerRef.current) {
            const forecastsAmount: number = dates ?? Math.floor(scrollContainerRef.current.clientWidth / forecastPreviewWidth);
            console.log(forecastsAmount);

            for (let i = 0; i < forecastsAmount; i++) {
                const date: Date = new Date();
                date.setDate(date.getDate() + dayIndex.current);

                previews.push({
                    temperature: 32,
                    date,
                    isHighFloodRisk: false,
                    weatherType: WeatherType.sunny
                });
                dayIndex.current++;
            }
            setPreviews([...previews]);
        }
    }

    function onScroll() : void{
        if (scrollContainerRef.current) {
            const scrollWidth = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;

            if (scrollWidth - scrollContainerRef.current.scrollLeft == 0) {
                loadNewDates(7);
            }
        }
    }

    // function onMouseOver() : void{
    //     if(!isMouseOverContainer.current)
    //         isMouseOverContainer.current = true;
    // }

    // function onMouseLeave() : void {
    //     isMouseOverContainer.current = false;
    // }

    // function onWindowScroll(e : Event) : void {
    //     if(isMouseOverContainer.current) {
    //         console.log(e);
    //     }
    // }

    function onMouseWheelMove(e : any) : void {
        scrollContainerRef.current?.scrollBy({ left: e.deltaY / 1.5 });
    }

    useEffect(() => {
        loadNewDates();
    }, []);

    // const settings = {
    //     dots: false,
    //     speed: 500,
    //     slidesToShow: 14,
    //     slidesToScroll: 1,
    //     swipeToSlide: true,
    //     draggable: true,
    //     lazyLoad: "progressive" as LazyLoadTypes,
    //     responsive: [
    //         {
    //             breakpoint: 1600,
    //             settings: {
    //                 slidesToShow: 12,
    //             }
    //         },
    //         {
    //             breakpoint: 1440,
    //             settings: {
    //                 slidesToShow: 10,
    //             }
    //         },
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 8,
    //             }
    //         },
    //         {
    //             breakpoint: 768,
    //             settings: {
    //                 slidesToShow: 6,
    //             }
    //         },
    //         {
    //             breakpoint: 600,
    //             settings: {
    //                 slidesToShow: 4,
    //             }
    //         },
    //     ]
    // };



    return (
        <PreviewsContainer
            ref={scrollContainerRef}
            onScroll={onScroll}
            onWheel={onMouseWheelMove}
            // onMouseOver={onMouseOver}
            // onMouseLeave={onMouseLeave}
            >
            {/* // <Slider {...settings}> */}
            {previews.map((preview, i) =>
                <ForecastPreview
                    key={i}
                    date={preview.date}
                    temperature={preview.temperature}
                    isHighFloodRisk={preview.isHighFloodRisk}
                    weatherType={preview.weatherType}
                />
            )}
            {/* // </Slider> */}
        </PreviewsContainer>
    );
}