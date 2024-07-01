import React from "react";
import PropertyCard from '@/components/PropertyCard';
import properties from '@/properties.json';

const fetchProperties = async() => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`)

    if (!res.ok) {
      throw new Error('Failed to fetch data')    
    }
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const PropertiesPage = async () => {
  const properties = await fetchProperties()
  console.log(properties)
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties?.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties?.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default PropertiesPage;
