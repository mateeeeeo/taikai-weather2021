import { useContext } from 'react';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { SelectedDateContext } from '../contexts/SelectedDateContext';
import { WeatherType } from './../enums/enums';
import ForecastPreview from './ForecastPreview';

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
    const { selectedDate } = useContext(SelectedDateContext);

    // const dayIndex = useRef<number>(0);
    const lastDayIndex = useRef<number>(0);
    const firstDayIndex = useRef<number>(0);

    useEffect(() => {
        scrollContainerRef.current?.addEventListener('wheel', onMouseWheelMove);

        loadNewDates(); // loads in the data for 7 days from today
    }, []);

    useEffect(() => {

    }, [selectedDate]);

    function loadNewDates(dates?: number): void {
        if (scrollContainerRef.current) {
            const forecastsAmount: number = dates ? Math.abs(dates) :
                Math.floor(scrollContainerRef.current.clientWidth / forecastPreviewWidth); // loads in as many dates necessary as to fill the scrollview

            if(!dates) {
                firstDayIndex.current = lastDayIndex.current = Math.floor(-forecastsAmount / 2);
            }

            for (let i = 0; i < forecastsAmount; i++) {
                const date: Date = new Date(); // today's date as starting point

                if (dates && dates > 0) { // future dates
                    date.setDate(date.getDate() + lastDayIndex.current);
                    previews.push({
                        temperature: 32,
                        date,
                        isHighFloodRisk: false,
                        weatherType: WeatherType.sunny
                    });
                    lastDayIndex.current++;

                } else if (dates) { // past dates
                    date.setDate(date.getDate() + firstDayIndex.current);
                    previews.unshift({
                        temperature: 32,
                        date,
                        isHighFloodRisk: false,
                        weatherType: WeatherType.sunny
                    });
                    firstDayIndex.current--;

                } else { // initial dates
                    date.setDate(date.getDate() + lastDayIndex.current);
                    previews.push({
                        temperature: 32,
                        date,
                        isHighFloodRisk: false,
                        weatherType: WeatherType.sunny
                    });
                    lastDayIndex.current++;
                }
            }
            setPreviews([...previews]);
        }
    }

    function loadDatesByRange(start: Date, dates: number): void {

    }

    function onScroll(): void {
        if (scrollContainerRef.current) {
            const scrollWidth = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;

            if (scrollWidth - scrollContainerRef.current.scrollLeft == 0) {
                loadNewDates(7);
            } else if(scrollContainerRef.current.scrollLeft == 0) {
                loadNewDates(-7);
            }
        }
    }

    function onMouseWheelMove(e: any): void {
        e.preventDefault();
        scrollContainerRef.current?.scrollBy({ left: e.deltaY / 2 });
    }

    return (
        <PreviewsContainer
            ref={scrollContainerRef}
            onScroll={onScroll}>
            {previews.map((preview, i) =>
                <ForecastPreview
                    key={i}
                    date={preview.date}
                    temperature={preview.temperature}
                    isHighFloodRisk={preview.isHighFloodRisk}
                    weatherType={preview.weatherType}
                />
            )}
        </PreviewsContainer>
    );
}