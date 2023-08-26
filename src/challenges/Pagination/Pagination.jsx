import React, { useEffect, useState } from 'react'


const EACH_PAGE = 6;
// two approaches
// get all data then apply pagination in frontend 
// pagination in backend

// It is a pagination in frontend

// const URL = `https://dummyjson.com/products?limit=${EACH_PAGE}`;
const URL = `https://dummyjson.com/products?limit=0`;

const Pagination = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const fetchProducts = async () => {
        try {
            const res = await fetch(URL);
            const data = await res.json();
            setProducts(data.products);
            setTotal(data.total);
        }
        catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    const handlePageChange = (pageNum) => {
        setPage(pageNum);
    }


    const visibleProducts = products?.slice((page - 1) * EACH_PAGE, page * EACH_PAGE);
    const totalPages = Math.ceil(total / EACH_PAGE);

    return (
        <div>
            <h1 className='text-center text-4xl'>Products</h1>
            <section className='py-4 grid grid-cols-1 md:grid-cols-3 gap-3'>
                {
                    visibleProducts.length > 0 ?
                        visibleProducts.map(product => {
                            return (<div className="bg-slate-50 flex flex-col gap-3" key={product.id}>
                                <img src={product.thumbnail} alt="thumbnail" className='mx-auto w-44 h-44 object-cover	' />
                                <h3 className='text-center'>{product.title}</h3>
                            </div>)
                        }) : <div className='text-center'>Loading...</div>
                }
            </section>
            <footer className='text-center py-7'>
                <div className='inline'>
                    {page === 1 ? null : <span className='text-2xl pr-3 cursor-pointer'>⬅︎</span>}
                    {
                        [...Array(totalPages)]
                            .map((_, i) => {
                                return (<span onClick={() => handlePageChange(i + 1)} className={`text-2xl p-3 border border-blue-300 cursor-pointer ${page===i+1 && "bg-slate-200"}`}>{i + 1}</span>)
                            })
                    }
                    {page === totalPages ? null : <span className='text-2xl pl-3 cursor-pointer'>➡︎</span>}
                </div>

            </footer>
        </div>
    )
}

export default Pagination