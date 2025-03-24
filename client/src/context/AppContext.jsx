import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user } = useUser();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all courses
  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/course/all`);
      if (data.success) {
        setAllCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.message);
        setIsEducator(data.user?.role === "educator");
      } else {
        toast.error("Failed to fetch user data.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to calculate average rating of a course
  const calculateRating = (course) => {
    if (!course?.courseRatings?.length) return 0;

    const totalRating = course.courseRatings.reduce(
      (sum, rating) => sum + (rating.rating || 0),
      0
    );
    return Math.floor(totalRating / course.courseRatings.length);
  };

  // Function to calculate chapter time
  const calculChapterTime = (chapter) => {
    const time = chapter.chapterContent.reduce(
      (acc, lecture) => acc + lecture.lectureDuration,
      0
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate course duration
  const calculateCourseDuration = (course) => {
    const time = course.courseContent.reduce(
      (acc, chapter) =>
        acc +
        chapter.chapterContent.reduce((sum, lecture) => sum + lecture.lectureDuration, 0),
      0
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to count number of lectures in a course
  const calculateNoOfLectures = (course) => {
    return course.courseContent.reduce(
      (acc, chapter) => acc + chapter.chapterContent.length,
      0
    );
  };

  // Fetch enrolled courses
  const fetchEnrolledCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/user/enrolled-courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        const uniqueCourses = [...new Map(data.enrolledCourses.map(course => [course._id, course])).values()];
        setEnrolledCourses(uniqueCourses.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([fetchUserData(), fetchEnrolledCourses()])
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        currency,
        allCourses,
        navigate,
        calculateRating,
        isEducator,
        enrolledCourses,
        fetchEnrolledCourses,
        backendUrl,
        setUserData,
        
        userData,
        getToken,
        fetchAllCourses,
        calculChapterTime,
        calculateCourseDuration,
        calculateNoOfLectures,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
