import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Avatar,
  Divider,
  CircularProgress,
  Stack,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  fetchProductReviews,
  addReview,
  removeReview,
} from "../../store/slices/review.slice";
import { fetchProductById } from "../../store/slices/product.slice";
import toast from "react-hot-toast";

function ProductReviews({ productId }) {
  const dispatch = useDispatch();
  const { reviews, loading } = useSelector((state) => state.review);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductReviews(productId));
    }
  }, [dispatch, productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Please provide a rating.");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please provide a comment.");
      return;
    }

    setSubmitting(true);
    const result = await dispatch(
      addReview({ productId, data: { rating, comment } })
    );

    if (addReview.fulfilled.match(result)) {
      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
      dispatch(fetchProductById(productId));
    } else {
      toast.error(result.payload || "Failed to submit review.");
    }
    setSubmitting(false);
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      const result = await dispatch(removeReview(reviewId));
      if (removeReview.fulfilled.match(result)) {
        toast.success("Review deleted!");
        dispatch(fetchProductById(productId));
      } else {
        toast.error(result.payload || "Failed to delete review.");
      }
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Customer Reviews
      </Typography>

      {/* Review Form */}
      {isAuthenticated ? (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 3,
            mb: 4,
            border: "1px solid #e5e5e5",
            borderRadius: 2,
            backgroundColor: "#fafafa",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Write a Review
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography component="legend" sx={{ fontSize: "0.9rem", mb: 0.5 }}>
              Your Rating
            </Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              size="large"
            />
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="What did you like or dislike?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mb: 2, backgroundColor: "#fff" }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              px: 4,
              py: 1,
              fontWeight: 600,
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            {submitting ? <CircularProgress size={24} color="inherit" /> : "Submit Review"}
          </Button>
        </Box>
      ) : (
        <Typography sx={{ mb: 4, fontStyle: "italic", color: "#666" }}>
          Please log in to write a review.
        </Typography>
      )}

      {/* Reviews List */}
      {loading && reviews.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : reviews.length === 0 ? (
        <Typography sx={{ color: "#666" }}>
          No reviews yet. Be the first to review this product!
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {reviews.map((review) => (
            <Box key={review._id}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar
                  src={review.user?.avatar?.url}
                  sx={{ width: 48, height: 48, bgcolor: "#eee", color: "#666" }}
                >
                  {review.user?.firstName?.[0]}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {review.user?.firstName} {review.user?.lastName}
                      </Typography>
                      <Rating
                        value={review.rating}
                        readOnly
                        size="small"
                        sx={{ my: 0.5 }}
                      />
                      <Typography variant="caption" sx={{ color: "#888" }}>
                        {new Date(review.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Typography>
                    </Box>
                    {(user?._id === review.user?._id || user?.role === "admin") && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(review._id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1.5, color: "#444", lineHeight: 1.6 }}
                  >
                    {review.comment}
                  </Typography>
                </Box>
              </Stack>
              <Divider sx={{ mt: 3, borderColor: "#f5f5f5" }} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ProductReviews;
