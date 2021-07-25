import { useContext } from 'react';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { fetchForecastsForLocationJSON } from '../api/FetchForecasts';
import { SelectedDateContext } from '../contexts/SelectedDateContext';
import { WeatherType } from './../enums/enums';
import ForecastPreview from './ForecastPreview';

interface Preview {
    date: Date,
    key: number
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
    const [previews, setPreviews] = useState<Preview[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);

    const key = useRef<number>(0);

    // const dayIndex = useRef<number>(0);
    const lastDayIndex = useRef<number>(-1);
    const firstDayIndex = useRef<number>(0);

    const changedByForecastClick = useRef<boolean>(false); // determines whether the current selected date was changed by the date picker or by clicking on a forecast
    const isFirstRender = useRef<boolean>(true);

    useEffect(() => {
        scrollContainerRef.current?.addEventListener('wheel', onMouseWheelMove);
        loadDates(); // loads initial forecasts 
        scrollContainerRef.current?.scrollBy({ left: scrollContainerRef.current.scrollWidth / 2 });
    }, []);

    useEffect(() => {
        if (!changedByForecastClick.current && !isFirstRender.current) {
            if (scrollContainerRef.current)
                loadDatesByRange(selectedDate, Math.ceil(scrollContainerRef.current.clientWidth / forecastPreviewWidth));
        }
        changedByForecastClick.current = false;
        isFirstRender.current = false;
    }, [selectedDate]);

    function loadDates(dates?: number): void {
        if (scrollContainerRef.current) {
            const forecastsAmount: number = dates ? Math.abs(dates) :
                Math.ceil(scrollContainerRef.current.clientWidth / forecastPreviewWidth); // loads in as many dates necessary as to fill the scrollview

            if (!dates) {
                firstDayIndex.current = lastDayIndex.current = Math.floor(-forecastsAmount / 2);
            }

            for (let i = 0; i < forecastsAmount; i++) {
                const date: Date = new Date(); // today's date as starting point

                if ((dates && dates > 0) || !dates) { // future or initial dates 
                    date.setDate(date.getDate() + lastDayIndex.current);

                    previews.push({
                        date,
                        key: key.current
                    });

                    lastDayIndex.current++;
                } else { // past dates
                    date.setDate(date.getDate() + firstDayIndex.current);

                    previews.unshift({
                        date,
                        key: key.current
                    });

                    firstDayIndex.current--;
                }
                key.current++;
            }
            setPreviews([...previews]);
        }
    }

    function loadDatesByRange(start: Date, dates: number): void {
        firstDayIndex.current = lastDayIndex.current = Math.floor(-dates / 2);

        previews.splice(0, previews.length); // clears the previews

        for (let i = 0; i < dates; i++) {
            const date = new Date(start);
            date.setDate(date.getDate() + lastDayIndex.current);
            previews.push({
                date,
                key: key.current
            });
            lastDayIndex.current++;
            key.current++;
        }
        setPreviews([...previews]);
    }

    function onScroll(): void {
        const forecastsAmount: number = 7;

        if (scrollContainerRef.current) {
            const scrollWidth = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;

            if (scrollWidth - scrollContainerRef.current.scrollLeft == 0) {
                loadDates(forecastsAmount);
            } else if (scrollContainerRef.current.scrollLeft == 0) {
                loadDates(-forecastsAmount);
                scrollContainerRef.current?.scrollBy({ left: forecastPreviewWidth * forecastsAmount }); // scrolls the length of specified amount of forecasts 
            }
        }
    }

    function onMouseWheelMove(e: any): void {
        e.preventDefault();
        scrollContainerRef.current?.scrollBy({ left: e.deltaY / 2 });
    }

    // this is to prevent the useEffect behaviour to be ran from selecting a forecast manually, rather in the onChange of the DatePicker
    function forecastSetSelectedDate(date: Date): void {
        changedByForecastClick.current = true;
        setSelectedDate(date);
    }

    return (
        <PreviewsContainer
            ref={scrollContainerRef}
            onScroll={onScroll}>
            {previews.map((preview) => {
                console.log(preview.key);
                return <ForecastPreview
                    key={preview.key}
                    date={preview.date}
                    setSelectedDate={forecastSetSelectedDate} />
            })}
        </PreviewsContainer>
    );
}