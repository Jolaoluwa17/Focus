"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface Comment {
  id: string
  author: string
  email: string
  rating: number
  comment: string
  date: string
  avatar?: string
  timeOnPlatform: string
}

interface CommentsSectionProps {
  productId: string
}

export function CommentsSection({ productId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Sarah Johnson",
      email: "sarah@example.com",
      rating: 5,
      comment:
        "Absolutely love these jeggings! Perfect fit and super comfortable. The material is soft and stretchy, exactly what I was looking for. Highly recommend to anyone looking for quality everyday wear!",
      date: "2024-01-15",
      avatar: "/placeholder.svg?height=40&width=40",
      timeOnPlatform: "2 years on Focus",
    },
    {
      id: "2",
      author: "Emma Wilson",
      email: "emma@example.com",
      rating: 5,
      comment:
        "Great quality and fast shipping. The material is soft and stretchy. Will definitely buy again. The sizing was perfect and the color matches exactly what was shown in the photos.",
      date: "2024-01-10",
      avatar: "/placeholder.svg?height=40&width=40",
      timeOnPlatform: "1 year on Focus",
    },
    {
      id: "3",
      author: "Michael Chen",
      email: "michael@example.com",
      rating: 4,
      comment:
        "Good product overall. The fit is comfortable and the quality seems solid. Delivery was quick and packaging was excellent. Would recommend to others.",
      date: "2024-01-08",
      avatar: "/placeholder.svg?height=40&width=40",
      timeOnPlatform: "3 years on Focus",
    },
    {
      id: "4",
      author: "Lisa Rodriguez",
      email: "lisa@example.com",
      rating: 5,
      comment:
        "These are amazing! So comfortable and stylish. I've been wearing them constantly since I got them. The quality is outstanding and they wash beautifully.",
      date: "2024-01-05",
      avatar: "/placeholder.svg?height=40&width=40",
      timeOnPlatform: "6 months on Focus",
    },
  ])

  const [newComment, setNewComment] = useState({
    author: "",
    email: "",
    rating: 5,
    comment: "",
  })

  const [showMore, setShowMore] = useState<{ [key: string]: boolean }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const comment: Comment = {
      id: Date.now().toString(),
      ...newComment,
      date: new Date().toISOString().split("T")[0],
      timeOnPlatform: "New to Focus",
    }
    setComments([comment, ...comments])
    setNewComment({ author: "", email: "", rating: 5, comment: "" })
  }

  const toggleShowMore = (commentId: string) => {
    setShowMore((prev) => ({ ...prev, [commentId]: !prev[commentId] }))
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void, size = "sm") => {
    const starSize = size === "lg" ? "h-6 w-6" : "h-4 w-4"

    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => onRatingChange?.(star) : undefined}
            className={interactive ? "cursor-pointer" : "cursor-default"}
          >
            <Star className={`${starSize} ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 14) return "1 week ago"
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  return (
    <div className="space-y-8">
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

        {/* Comments Grid - 2x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              <div className="flex items-start space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-slate-100">
                    {comment.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{comment.timeOnPlatform}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {renderStars(comment.rating)}
                <span className="text-sm text-gray-600">• {formatDate(comment.date)}</span>
              </div>

              <div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {showMore[comment.id] || comment.comment.length <= 150
                    ? comment.comment
                    : truncateText(comment.comment, 150)}
                </p>
                {comment.comment.length > 150 && (
                  <button
                    onClick={() => toggleShowMore(comment.id)}
                    className="text-sm text-gray-900 font-medium underline mt-1 hover:no-underline"
                  >
                    {showMore[comment.id] ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Show All Reviews Button */}
        <div className="text-center mb-8">
          <Button variant="outline" size="lg" className="px-8">
            Show all {comments.length} reviews
          </Button>
        </div>

        {/* Add Comment Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Write a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author">Name *</Label>
                <Input
                  id="author"
                  type="text"
                  value={newComment.author}
                  onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newComment.email}
                  onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Rating *</Label>
              <div className="mt-2">
                {renderStars(newComment.rating, true, (rating) => setNewComment({ ...newComment, rating }), "lg")}
              </div>
            </div>

            <div>
              <Label htmlFor="comment">Review *</Label>
              <Textarea
                id="comment"
                placeholder="Share your thoughts about this product..."
                value={newComment.comment}
                onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                className="min-h-[100px]"
                required
              />
            </div>

            <Button type="submit" className="bg-slate-800 hover:bg-slate-700 text-white">
              Submit Review
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
