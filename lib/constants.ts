// Mock video data
export const VIDEOS = [
  {
    id: "video-1",
    title: "Product Demo Video",
    description:
      "A comprehensive demonstration of our product features and capabilities.",
    status: "READY",
    uploadedAt: new Date("2023-05-15"),
    size: "125.4 MB",
    duration: "2:45",
    thumbnail: "/product-demo-presentation.png",
    url: "#",
    views: 24,
    lastViewed: new Date("2023-05-20"),
    owner: "John Doe",
  },
  {
    id: "video-2",
    title: "Team Meeting Recording",
    description: "Recording of our weekly team meeting with important updates.",
    status: "PROCESSING",
    uploadedAt: new Date("2023-05-18"),
    size: "345.7 MB",
    duration: "45:12",
    thumbnail: "/business-meeting.png",
    url: "#",
    views: 12,
    lastViewed: new Date("2023-05-19"),
    owner: "John Doe",
  },
  {
    id: "video-3",
    title: "Marketing Campaign",
    description:
      "Overview of our upcoming marketing strategy and campaign plans.",
    status: "UPLOADING",
    uploadedAt: new Date("2023-05-20"),
    size: "78.2 MB",
    duration: "1:30",
    thumbnail: "/marketing-strategy-meeting.png",
    url: "#",
    views: 0,
    lastViewed: null,
    owner: "John Doe",
  },
  {
    id: "video-4",
    title: "Tutorial: How to Use Our Platform",
    description:
      "Step-by-step guide on how to use all features of our platform.",
    status: "READY",
    uploadedAt: new Date("2023-05-10"),
    size: "156.8 MB",
    duration: "12:20",
    thumbnail: "/tutorial-concept.png",
    url: "#",
    views: 18,
    lastViewed: new Date("2023-05-17"),
    owner: "John Doe",
  },
  {
    id: "video-5",
    title: "Customer Testimonial",
    description: "Our customer sharing their experience with our product.",
    status: "READY",
    uploadedAt: new Date("2023-05-05"),
    size: "42.3 MB",
    duration: "3:45",
    thumbnail: "/testimonial-card.png",
    url: "#",
    views: 8,
    lastViewed: new Date("2023-05-15"),
    owner: "John Doe",
  },
];

// Mock shared links data
export const SHARED_LINKS = [
  {
    id: "link-1",
    videoId: "video-1",
    url: "https://videovault.example/share/link-1",
    visibility: "PUBLIC",
    expires: new Date("2023-06-15"), // Past date to make it expired
    createdAt: new Date("2023-05-01"),
    lastViewed: new Date("2023-05-10"),
    views: 24,
    isExpired: true,
  },
  {
    id: "link-2",
    videoId: "video-1",
    url: "https://videovault.example/share/link-2",
    visibility: "PRIVATE",
    expires: new Date("2025-07-15"), // Future date
    createdAt: new Date("2023-05-16"),
    lastViewed: new Date("2023-05-18"),
    views: 3,
    allowedEmails: ["guest@example.com", "team@example.com"],
    isExpired: false,
  },
  {
    id: "link-3",
    videoId: "video-2",
    url: "https://videovault.example/share/link-3",
    visibility: "PUBLIC",
    expires: null, // Never expires
    createdAt: new Date("2023-05-10"),
    lastViewed: new Date("2023-05-19"),
    views: 12,
    isExpired: false,
  },
  {
    id: "link-4",
    videoId: "video-4",
    url: "https://videovault.example/share/link-4",
    visibility: "PRIVATE",
    expires: new Date("2025-05-25"), // Future date
    createdAt: new Date("2023-05-11"),
    lastViewed: null,
    views: 0,
    allowedEmails: ["training@example.com"],
    isExpired: false,
  },
  {
    id: "link-5",
    videoId: "video-5",
    url: "https://videovault.example/share/link-5",
    visibility: "PUBLIC",
    expires: new Date("2025-06-30"), // Future date
    createdAt: new Date("2023-05-05"),
    lastViewed: new Date("2023-05-15"),
    views: 8,
    isExpired: false,
  },
];

// Mock upload history data
export const UPLOAD_HISTORY = [
  {
    id: "upload-1",
    videoId: "video-1",
    fileName: "product-demo-final-v2.mp4",
    fileSize: "125.4 MB",
    uploadedAt: new Date("2023-05-15T14:30:00"),
    status: "READY",
    thumbnail: "/product-demo-presentation.png",
    duration: "2:45",
  },
  {
    id: "upload-2",
    videoId: "video-2",
    fileName: "team-meeting-may-18.mp4",
    fileSize: "345.7 MB",
    uploadedAt: new Date("2023-05-18T10:15:00"),
    status: "PROCESSING",
    thumbnail: "/business-meeting.png",
    duration: "45:12",
    progress: 80,
  },
  {
    id: "upload-3",
    videoId: "video-3",
    fileName: "marketing-campaign-2023.mp4",
    fileSize: "78.2 MB",
    uploadedAt: new Date("2023-05-20T09:45:00"),
    status: "UPLOADING",
    thumbnail: "/marketing-strategy-meeting.png",
    duration: "1:30",
    progress: 45,
  },
  {
    id: "upload-4",
    videoId: "video-4",
    fileName: "platform-tutorial.mp4",
    fileSize: "156.8 MB",
    uploadedAt: new Date("2023-05-10T16:20:00"),
    status: "READY",
    thumbnail: "/tutorial-concept.png",
    duration: "12:20",
  },
  {
    id: "upload-5",
    videoId: "video-5",
    fileName: "customer-testimonial-john.mp4",
    fileSize: "42.3 MB",
    uploadedAt: new Date("2023-05-05T11:30:00"),
    status: "READY",
    thumbnail: "/testimonial-card.png",
    duration: "3:45",
  },
  {
    id: "upload-6",
    videoId: null,
    fileName: "quarterly-report-presentation.mp4",
    fileSize: "98.1 MB",
    uploadedAt: new Date("2023-05-22T08:15:00"),
    status: "FAILED",
    error: "File format not supported",
  },
];

// Mock user data
export const USER = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "/abstract-geometric-shapes.png",
};

// Helper functions to get data
export function getVideoById(id: string) {
  return VIDEOS.find((video) => video.id === id) || null;
}

export function getSharedLinkById(id: string) {
  return SHARED_LINKS.find((link) => link.id === id) || null;
}

export function getVideoShareLinks(videoId: string) {
  return SHARED_LINKS.filter((link) => link.videoId === videoId);
}

export function getUploadById(id: string) {
  return UPLOAD_HISTORY.find((upload) => upload.id === id) || null;
}
