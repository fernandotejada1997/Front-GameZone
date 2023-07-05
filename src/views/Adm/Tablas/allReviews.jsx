import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as act from "../../../redux/actions";
import MUIDataTable from 'mui-datatables';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import Tooltip from '@mui/material/Tooltip';
import { FaStar } from "react-icons/fa";
import style from  "./tabla.module.css"

function AllReviews() {
    const history = useHistory();
    const dispatch = useDispatch();
    const games = useSelector(state => state.games);
    const [allReviews, setAllReviews] = useState([]);
    const muiTableRef = useRef();

    useEffect(() => {
        dispatch(act.getGames());
    }, [dispatch]);

    useEffect(() => {
        const reviewsData = getReviewsData(games);
        setAllReviews(reviewsData);
    }, [games]);

    const getReviewsData = (games) => {
        const reviewsData = [];

        games?.forEach((game) => {
            game?.Reviews?.forEach((review) => {
                const reviewData = {
                    game: game.name,
                    reviews: review?.reviews,
                    date: review?.date,
                    rating: review?.rating,
                    Users: review?.Users[0]?.name,
                    reviewId: review.id
                };

                reviewsData.push(reviewData);
            });
        });

        return reviewsData;
    };

    const handleDelete = async (reviewId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You are about to delete the review.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel',
                reverseButtons: true,
                
            });

            if (result.isConfirmed) {
                await dispatch(act.getDeleteReview(reviewId));
                Swal.fire({title:"review deleted", showConfirmButton: false, timer: 2000}).then(() => {
                    window.location.reload();
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Deletion canceled.', '', 'info');
            }
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    const renderStars = (rating) => {
        const totalStars = 5;
        const filledStars = Math.round(rating);
        const emptyStars = totalStars - filledStars;
      
        const stars = [];
      
        // Renderizar estrellas llenas
        for (let i = 0; i < filledStars; i++) {
          stars.push(<FaStar key={i} color="#000" />);
        }
      
        // Renderizar estrellas vacías
        for (let i = 0; i < emptyStars; i++) {
          stars.push(<FaStar key={filledStars + i} color="#e0e0e0" />);
        }
      
        return stars;
      };
      

    const columns = [
        {
            name: "date",
            label: "Date",
        },
        {
            name: "game",
            label: "Game Name",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) => {
                    const game = allReviews[dataIndex].game;
                    return (
                        <div>
                            <Tooltip title={game}>
                                <span>{game}</span>
                            </Tooltip>
                        </div>
                    );
                },
                setCellProps: () => ({
                    style: {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 100, // Ajusta el valor según tus necesidades
                    },
                }),
            },
        },
        {
            name: "Users",
            label: "User Name",
        },
        {
            name: "reviews",
            label: "Reviews",
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) => {
                    const review = allReviews[dataIndex].reviews;
                    return (
                        <div>
                            <Tooltip title={review}>
                                <span>{review}</span>
                            </Tooltip>
                        </div>
                    );
                },
                setCellProps: () => ({
                    style: {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 200, // Ajusta el valor según tus necesidades
                    },
                }),
            },
        },
        {
            name: "rating",
            label: "Rating",
            options: {
                customBodyRenderLite: (dataIndex) => {
                    const rating = allReviews[dataIndex].rating;
                    return (
                        <div>{renderStars(rating)}</div>
                    );
                },
            },
        },
        {
            name: "Actions",
            options: {
                customBodyRenderLite: (dataIndex) => {
                    const reviewId = allReviews[dataIndex].reviewId;
                    return (
                        <div>
                            <IconButton onClick={() => handleDelete(reviewId)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    );
                },
            },
        },
    ];

    const getMuiTheme = () =>
        createTheme({
            overrides: {
                MUIDataTableBodyCell: {
                    root: {
                        cursor: 'pointer',
                    },
                },
            },
        });

    return (
        <div className= {style.total} >
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    ref={muiTableRef}
                    title="Reviews List"
                    data={allReviews}
                    columns={columns}
                />
                </ThemeProvider>
        </div>
    );
}

export default AllReviews;
