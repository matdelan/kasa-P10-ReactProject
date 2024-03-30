import './PageRental.sass'
import { useLoaderData, useParams, useAsyncValue, Await } from 'react-router-dom'
import { Suspense } from 'react'
import Collapse from '../../components/Collapse/Collapse'
import IconStar from '../../components/IconStar/IconStar'
import Carrousel from '../../components/Carrousel/Carrousel'
import Portrait from '../../components/Portrait/Portrait'
import RentalContent from '../../components/RentalContent/RentalContent'

export default function PageRental() {
    const {rentals} = useLoaderData()
    const {id} = useParams()

    return <>
        <Suspense>
            <Await resolve={rentals}>
                {(rentals) => 
                    { 
                        const rental = rentals.find(rental => (rental.id === id))
                        if(rental)
                            return <>
                                <Carrousel imgLinks={rental.pictures}/>
                                <div className='pageRental'>
                                    <RentalContent title={rental.title} location={rental.location} tags={rental.tags}/> 
                                    <aside className='pageRental__aside'>
                                        <Portrait host={rental.host} />
                                        <IconStar rating={rental.rating}/>
                                    </aside>
                                </div>
                                <div className='pageRental__collapse'>
                                    <li className='pageRental__collapse-item'><Collapse title="Description" content={rental.description}/></li>
                                    <li className='pageRental__collapse-item'><Collapse title="Equipments" content={rental.equipments}/></li>
                                </div>
                            </>
                        else
                            throw new Error("id is not defined")
                    
                    }
                    
                }
                
            </Await>
        </Suspense>

    </>
}