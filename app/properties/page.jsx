'use client'
import React, { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import Pagination from "@/components/Pagination";
import PropertySearchForm from "@/components/PropertySearchForm";

const PropertiesPage = async () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`/api/properties?page=${page}&pageSize=${pageSize}`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setProperties(data.properties);
        setTotalItems(data.total);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, pageSize]);

  // Sort properties by date
  properties?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }
  return loading ? (
    <Spinner />
  ) : (
    <>
    <section className='bg-green-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        <Pagination 
          page = {page}
          pageSize = {pageSize}
          totalItems={totalItems}
          onPageChange = {handlePageChange}
        />
      </div>
    </section>
    </>
  );
};
export default PropertiesPage;
