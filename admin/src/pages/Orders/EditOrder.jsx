import PageLayout from 'layouts/PageLayout';
import { useGetOrderById } from 'queries/OrderQuery';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Details from './Details';
import { Avatar, Button, Grid, Link, Typography } from '@mui/material';

const EditOrder = () => {
    const { id } = useParams()
    const [details, setDetails] = useState({})
    const { data, isLoading } = useGetOrderById({ id });
    useEffect(() => {
        setDetails(data?.data)
        console.log(data);
    }, [data])


    return (
        <PageLayout
            title={'Order Details'}
        >
            {isLoading ? <Typography fontSize={14} sx={{paddingX:5}}>loading...</Typography>:
            <Grid container spacing={5} display={'flex'} direction={'row'} p={8} justifyContent={'center'}>
                <Grid item container alignContent={'start'} width={'100%'} xs={12} sm={12} md={7} lg={5} spacing={3}>
                    {details?.products?.map(item => (
                        <Grid item container key={item?._id} xs={12} mb={2}
                            sx={{
                                position: 'relative',
                                display: "flex",
                                alignItems: "center",
                                borderRadius: '15px',
                                border: 'solid 1px #D3D3D3'
                            }}>
                            <Grid p={1}>
                                <img style={{ width: 120, height: 100, borderRadius: '20px', border: 'solid 1px #D3D3D3' }}
                                    src={`${process.env.REACT_APP_API_URL}/uploads/${item?.productId?.image[0]}`} />
                            </Grid>
                            <Grid p={1}>
                                <Typography variant='body2'>{item?.productId?.name}</Typography>
                                <Typography variant='caption'>{item?.productId?.brand}</Typography>
                                <Typography>₹{item?.price}</Typography>
                                <Typography fontSize={15}>qty x{item?.quantity}</Typography>
                            </Grid>
                            <Grid p={1} container spacing={1} xs={12}>
                                {item?.image?.map(x => (
                                    <Grid item key={x}>
                                        <Avatar component={Link} target='_blank' href={`${process.env.REACT_APP_API_URL}/uploads/${x}`} variant='rounded' src={`${process.env.REACT_APP_API_URL}/uploads/${x}`} >err</Avatar>
                                    </Grid>
                                ))}
                                {!!item?.image?.length && (<Grid item xs={12}>
                                    <Button onClick={()=>downloadImages(item.image)}>Download Resources</Button>
                                </Grid>)}
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
                <Details data={data?.data} />
            </Grid>}
        </PageLayout>
    )
}

export default EditOrder