import { useContext } from 'react';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { SelectedDateContext } from '../contexts/SelectedDateContext';
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
    const changedByScroll = useRef<boolean>(false);

    useEffect(() => {
        scrollContainerRef.current?.addEventListener('wheel', onMouseWheelMove);
        loadInitialDates(); // loads initial forecasts 
    }, []);

    useEffect(() => {
        if (!changedByForecastClick.current && !isFirstRender.current) {
            if (scrollContainerRef.current)
                loadDatesByRange(selectedDate, Math.ceil(scrollContainerRef.current.clientWidth / forecastPreviewWidth));
        }
        changedByForecastClick.current = false;
        isFirstRender.current = false;
    }, [selectedDate]);

    useEffect(() => {
        if (!changedByScroll.current)
            scrollContainerRef.current?.scrollTo({
                left: scrollContainerRef.current?.scrollWidth / 2 - scrollContainerRef.current?.clientWidth / 2,
                behavior: 'smooth'
            });
        changedByScroll.current = false;
    }, [previews]);

    function loadNewDates(dates: number): void {
        for (let i = 0; i < Math.abs(dates); i++) {
            if (dates > 0) { // future or initial dates 
                const date = previews.length > 0 ? new Date(previews[previews.length - 1].date.getTime()) : new Date(); // today's date as starting point
                date.setDate(date.getDate() + 1);
                previews.push({
                    date,
                    key: key.current
                });
            } else { // past dates
                const date = new Date(previews[0].date.getTime()); // today's date as starting point
                date.setDate(date.getDate() - 1);
                previews.unshift({
                    date,
                    key: key.current
                });
            }
            key.current++;
            changedByScroll.current = true;
        }
        setPreviews([...previews]);
    }

    function loadInitialDates() {
        if (scrollContainerRef.current) {
            const forecastsAmount: number = Math.ceil(scrollContainerRef.current.clientWidth / forecastPreviewWidth); // loads in as many dates necessary as to fill the scrollview

            const date: Date = new Date();
            date.setDate(date.getDate() - Math.ceil(forecastsAmount / 2));

            for (let i = 0; i < forecastsAmount; i++) {
                previews.push({
                    date: new Date(date.getTime()),
                    key: key.current
                });
                date.setDate(date.getDate() + 1);
                key.current++;
            }
            setPreviews([...previews]);
        }
    }

    function loadDatesByRange(start: Date, dates: number): void {
        previews.splice(0, previews.length); // clears the previews
        const date = new Date(start);
        date.setDate(date.getDate() - Math.floor(dates / 2));

        for (let i = 0; i < dates; i++) {
            previews.push({
                date: new Date(date.getTime()),
                key: key.current
            });
            date.setDate(date.getDate() + 1);
            key.current++;
        }
        setPreviews([...previews]);
    }

    function onScroll(): void {
        const forecastsAmount: number = 7;

        if (scrollContainerRef.current) {
            const scrollWidth = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;

            if (scrollWidth - scrollContainerRef.current.scrollLeft === 0) {
                loadNewDates(forecastsAmount);
            } else if (scrollContainerRef.current.scrollLeft === 0) {
                loadNewDates(-forecastsAmount);
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
                return <ForecastPreview
                    key={preview.key}
                    date={preview.date}
                    setSelectedDate={forecastSetSelectedDate} />
            })}
        </PreviewsContainer>
    );
}