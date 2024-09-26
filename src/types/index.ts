// Type for a navigation link with an image, route, and label
export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

// Type for updating user details
export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: string | URL; // Allow string or URL type
  file: File[]; // Assuming this is an array of files, could be a single file as well if needed
};

// Type for creating a new post
export type INewPost = {
  userId: string;
  caption: string;
  file: File[]; // Array of files for images, videos, etc.
  location?: string; // Optional location field
  tags?: string; // Optional tags field
};

// Type for updating a post
export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL; // URL type for image link
  file: File[]; // Array of files for updated media content
  location?: string; // Optional location field
  tags?: string; // Optional tags field
};

// Type representing a user in the system
export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string; // String for image URL
  bio: string; // User's bio
};

// Type for creating a new user
export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string; // Password for the new user
};
