import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import { toast } from "react-hot-toast";
import DashboardLayout from '../../components/layouts/DashboardLayout';
import RoleInfoHeader from './components/RoleInfoHeader';

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  //Fetch Session data by session id
  const fetchSessionDetailsById = async () =>  {} ;

  //Generate Concept Explaantion
  const generateConceptExplanation = async (question) => {} ;

  //Pin Question 
  const toggleQuestionPinStatus = async (questionId) => {

  };

  //Add more questions to a session 
  const uploadMoreQuestions = async () => {

  };

  useEffect(()=> {
    if (sessionId) {
      fetchSessionDetailsById();
    }
    return () => {};
  }, []) ;

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicToFocus={sessionData?.topicToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
          ? moment(sessionData.updatedAt).format("Do MMM YYYY")
          : ""
        }
         />
    </DashboardLayout>
  )
}

export default InterviewPrep