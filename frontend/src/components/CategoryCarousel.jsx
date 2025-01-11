import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice';

const CategoryCarousel = () => {
    const category = [
        "Web Developer",
        "App Developer",
        "Video Editor",
        "Graphic Designer",
        "Music Producer"
    ];

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submitHandler = (query) =>{
        dispatch(setSearchQuery(query))
        navigate("/browse")
    }

    return (
        <div>
            <Carousel className="w-full max-w-xl my-20 mx-auto">
                <CarouselContent>
                    {
                        category.map((cat, ind) => (
                            <CarouselItem key={ind} className="md:basis-1/2 lg:basis-1/3">
                                <Button onClick={() => submitHandler(cat)} variant="outline" className='rounded-full'>{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
