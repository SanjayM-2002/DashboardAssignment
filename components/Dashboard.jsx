import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { IoPencil } from 'react-icons/io5';
import { IoHome } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa';
import { IoIosCube } from 'react-icons/io';
import { AiFillFile } from 'react-icons/ai';
import ProgressBar from './ProgressBar';
import globalStyles from './globalStyles';

const Dashboard = () => {
  const [selectedButton, setSelectedButton] = useState('ToReview');
  const [submissionsToReview, setSubmissionsToReview] = useState([]);
  const [usersFlag, setUsersFlag] = useState([]);
  const [assignmentData, setAssignmentData] = useState({});

  const [submissionsShortlisted, setSubmissionsShortlisted] = useState([]);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [showShortlistButton, setShowShortlistButton] = useState(false);
  const [showAlreadyShortlistedButton, setShowAlreadyShortlistedButton] =
    useState(false);
  const [userData, setUserData] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchAssignmentData = async () => {
      try {
        const response = await fetch(
          'https://qyzlgjq37b.execute-api.ap-south-1.amazonaws.com/dev/assignment_details'
        );
        const data = await response.json();
        console.log('fetchAssignment data is: ', data);
        setAssignmentData(data);
      } catch (error) {
        console.error('Error fetching review list:', error);
      }
    };
    fetchAssignmentData();
    const fetchReviewList = async () => {
      try {
        const response = await fetch(
          'https://qyzlgjq37b.execute-api.ap-south-1.amazonaws.com/dev/assignment_candidates?status=review&limit=10&offset=0'
        );
        const data = await response.json();
        console.log('fetchReviewList data is: ', data);
        setSubmissionsToReview(data);
        const updatedUsersFlag = data.map((user) => ({
          userId: user.id,
          flag: false,
        }));
        setUsersFlag(updatedUsersFlag);
        setSelectedUser(data[0]);
        setUserData(data[0]);
        console.log('submissions to review is: ', submissionsToReview);
      } catch (error) {
        console.error('Error fetching review list:', error);
      }
    };

    fetchReviewList();

    const fetchShortlistedList = async () => {
      try {
        const response = await fetch(
          'https://qyzlgjq37b.execute-api.ap-south-1.amazonaws.com/dev/assignment_candidates?status=shortlisted&limit=10&offset=0'
        );
        const data = await response.json();
        // console.log('fetchShortlistedList data is: ', data);
        setSubmissionsShortlisted(data);
        const updatedUsersFlag = data.map((user) => ({
          userId: user.id,
          flag: true,
        }));
        setUsersFlag((prevState) => [...prevState, ...updatedUsersFlag]);
        localStorage.setItem(
          'usersFlag',
          JSON.stringify((prevState) => [...prevState, ...updatedUsersFlag])
        );
      } catch (error) {
        console.error('Error fetching shortlisted list:', error);
      }
    };

    fetchShortlistedList();
  }, []);

  const handleUserClick = async (userId) => {
    try {
      const response = await fetch(
        `https://qyzlgjq37b.execute-api.ap-south-1.amazonaws.com/dev/candidate_assignment_data?user_id=${userId}&assignment_id=assignment123`
      );
      const userData = await response.json();
      console.log('fetching user data from handleUserClick');
      console.log(userData);
      setUserData(userData);
      setSelectedUser(userData);
      console.log('new user data is: ', userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const handleShortlistButton = () => {
    const updatedSubmissionsToReview = submissionsToReview.filter(
      (submission) => submission.id !== userData.id
    );
    setSubmissionsToReview(updatedSubmissionsToReview);
    setSubmissionsShortlisted([...submissionsShortlisted, userData]);

    const updatedUsersFlag = usersFlag.map((user) =>
      user.userId === userData.id ? { userId: user.userId, flag: true } : user
    );
    setUsersFlag(updatedUsersFlag);
    localStorage.setItem('usersFlag', JSON.stringify(updatedUsersFlag));
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };
  const SubmissionsBox = (props) => {
    const isSelectedUser = props.userId === selectedUser?.id;
    return (
      <>
        <button
          onClick={() => props.onClick(props.userId)}
          style={{
            ...globalStyles.outerRowButton,
            backgroundColor: isSelectedUser ? '#ff6699' : 'inherit',
          }}
        >
          <div style={globalStyles.outerRowDiv}>
            <div>
              <img src='/profilePic.jpg' style={globalStyles.profilePicSmall} />
            </div>
            <div style={globalStyles.nameEmailDiv}>
              <div style={globalStyles.nameBold}>{props.name}</div>
              <div style={globalStyles.email}>{props.email}</div>
            </div>
          </div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 22,
              color: props.score > 50 ? 'green' : 'greenyellow',
            }}
          >
            {props.score} %
          </div>
        </button>
      </>
    );
  };
  const AssignmentDataBox = (props) => {
    return (
      <>
        <div style={{ marginTop: 12 }}>
          <div style={globalStyles.outerRowDiv}>
            <div style={globalStyles.titleText}>{props.title}</div>
            <div style={globalStyles.statusText}>
              {props.status}
              <button style={globalStyles.pencilButton}>
                <IoPencil style={{ fontSize: 12 }} />
              </button>
            </div>
          </div>
          <div style={globalStyles.outerRowDiv}>
            <div style={globalStyles.assignmentText}>Assignment Link</div>
            <div style={globalStyles.linkText}>{props.link}</div>
          </div>
          <div style={globalStyles.outerRowDiv}>
            <div style={globalStyles.assignmentText}>Assignment Hour</div>
            <div style={globalStyles.assignmentText}>
              {props.duration} hours
            </div>
          </div>
          <div style={globalStyles.outerRowDiv}>
            <div style={globalStyles.assignmentText}>Assignment Ends at</div>
            <div style={globalStyles.assignmentText}>
              {props.endsAt?.toString().substring(0, 2)} March
            </div>
          </div>
        </div>
      </>
    );
  };
  const UserInfo = (props) => {
    const isShortlisted = usersFlag.find(
      (user) => user.userId === props.userId
    )?.flag;

    return (
      <>
        <div>
          <div>
            <div style={globalStyles.outerRowUserProfile}>
              <div style={globalStyles.outerRowDiv}>
                <div>
                  <img
                    src='/profilePic.jpg'
                    style={globalStyles.profilePicLarge}
                  />
                </div>
                <div
                  style={{
                    justifyContent: 'flex-start',
                    justifySelf: 'flex-start',
                    marginLeft: 2,
                  }}
                >
                  <div style={globalStyles.userNameText}>{props.name}</div>
                  <div style={globalStyles.userEmailText}>{props.email}</div>
                </div>
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 28,
                  color: props.score > 50 ? 'green' : 'greenyellow',
                }}
              >
                {props.score}%
              </div>
            </div>
          </div>
          <div
            style={{ alignContent: 'center', marginTop: 24, marginBottom: 16 }}
          >
            {props.scores &&
              props.scores.map((item) => {
                return (
                  <div key={item.score_type} style={globalStyles.cellWrapper}>
                    <div
                      style={{
                        color: '#78869B',
                        fontWeight: 700,
                        flex: 2,
                      }}
                    >
                      {item.score_type}
                    </div>
                    <div style={{ flex: 3 }}>
                      <ProgressBar
                        color={item.user_score > 6 ? 'green' : 'greenyellow'}
                        backgroundColor='#ccc'
                        value={item.user_score * 10}
                      />
                    </div>
                    <div
                      style={{
                        color: item.user_score > 6 ? 'green' : 'greenyellow',
                        fontWeight: 700,
                        flex: 1,

                        textAlign: 'center',
                      }}
                    >
                      {item.user_score}/10
                    </div>
                  </div>
                );
              })}
          </div>
          <div>
            <div style={{ marginTop: 24 }}>
              <div style={globalStyles.subHeadingText}>About</div>
              <div style={globalStyles.descriptionText}>{props.about}</div>
            </div>
            <div style={{ marginTop: 24 }}>
              <div style={globalStyles.subHeadingText}>Experience</div>
              <div style={globalStyles.descriptionText}>{props.experience}</div>
            </div>
            <div style={{ marginTop: 24 }}>
              <div style={globalStyles.subHeadingText}>Hobbies</div>
              <div style={globalStyles.descriptionText}>{props.hobbies}</div>
            </div>
            <div style={{ marginTop: 24 }}>
              <div style={globalStyles.subHeadingText}>Introduction</div>
              <div style={globalStyles.descriptionText}>
                {props.introduction}
              </div>
            </div>
            <div>
              {isShortlisted === false && (
                <div style={globalStyles.shortlistButtonDiv}>
                  <button
                    onClick={props.onShortlist}
                    style={globalStyles.shortListButton}
                  >
                    SHORTLIST
                  </button>
                </div>
              )}
              {isShortlisted === true && (
                <div style={globalStyles.shortlistButtonDiv}>
                  <button
                    style={{
                      ...globalStyles.shortListButton,
                      cursor: 'not-allowed',
                    }}
                    disabled
                  >
                    ALREADY SHORTLISTED
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className='dashboard-container'>
        <div className='box1'>
          <div
            style={{
              gap: 10,
              marginBottom: 25,
              justifyContent: 'space-around',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src='/icon1.jpg' style={{ width: '25px', height: '25px' }} />
            <text style={globalStyles.altWorldText}>Hi, AltWorld</text>
          </div>
          <div
            style={{
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <IoHome style={{ fontSize: 12 }} />
            <text style={globalStyles.dashboardText}>Dashboard</text>
          </div>
          <div className='newAssignmentBox'>
            <div
              style={{
                paddingRight: '70%',
              }}
            >
              <button style={globalStyles.plusButton}>
                <FaPlus style={{ fontSize: 12 }} />
              </button>
            </div>
            <div style={{ color: 'white', fontWeight: 700 }}>
              New Assignment?
            </div>
            <div style={{ color: 'white', fontWeight: 400, fontSize: 12 }}>
              Select from predefined questions to have a quick turnaround
            </div>
            <button style={{ color: '#363F4F', fontSize: 12, marginTop: 8 }}>
              Create New Assignment
            </button>
          </div>
        </div>
        <div className='box2'>
          <text style={{ color: '#B2BECC' }}>Pages </text>
          <text style={{ color: '#363F4F' }}>/ Assignment</text>
          <div style={{ color: '#2D3748', fontWeight: 700 }}>Sales BDE</div>
          <div>
            <AssignmentDataBox
              title={assignmentData.title}
              status={assignmentData.status}
              link={assignmentData.link}
              duration={assignmentData.duration_in_seconds / 3600}
              endsAt={assignmentData.ends_at}
            />
          </div>
          <div style={globalStyles.buttons}>
            <button
              style={{
                background:
                  selectedButton === 'ToReview' ? '#4fd1c5' : 'transparent',
              }}
              onClick={() => handleButtonClick('ToReview')}
            >
              <div style={globalStyles.toReviewButton}>
                <IoIosCube />
                <div>TO REVIEW</div>
              </div>
            </button>
            <button
              style={{
                background:
                  selectedButton === 'Shortlisted' ? '#4fd1c5' : 'transparent',
              }}
              onClick={() => handleButtonClick('Shortlisted')}
            >
              <div style={globalStyles.toReviewButton}>
                <AiFillFile />
                <div>SHORTLISTED</div>
              </div>
            </button>
          </div>

          <div style={globalStyles.tableHeaderDiv}>
            <div style={{ color: '#B2BECC', fontWeight: 500 }}>Candidate</div>
            <div style={{ color: '#B2BECC', fontWeight: 500 }}>Score</div>
          </div>
          {selectedButton === 'ToReview'
            ? submissionsToReview.map((submission) => (
                <SubmissionsBox
                  name={submission.full_name}
                  email={submission.email}
                  score={submission.score}
                  userId={submission.id}
                  onClick={handleUserClick}
                />
              ))
            : submissionsShortlisted.map((submission) => (
                <SubmissionsBox
                  name={submission.full_name}
                  email={submission.email}
                  score={submission.score}
                  userId={submission.id}
                  onClick={handleUserClick}
                />
              ))}
        </div>
        <div className='box3'>
          <UserInfo
            name={userData.full_name}
            email={userData.email}
            score={userData.score}
            about={userData.about_me}
            experience={userData.experience}
            hobbies={userData.hobbies}
            introduction={userData.introduction}
            scores={userData.scores}
            userId={userData.id}
            onShortlist={handleShortlistButton}
          />
        </div>
        <div className='box4'>
          <div
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              display: 'flex',
              paddingTop: 25,
            }}
          >
            <img
              src='/profilePic.jpg'
              style={{ height: '70%', width: '70%' }}
            />
          </div>
        </div>
      </div>
      <div className='footerDiv'>
        <div
          style={{ color: '#B2BECC', marginLeft: '15%', marginRight: '40%' }}
        >
          @2024, ProfileScreener.com
        </div>
        <div style={{ color: '#B2BECC', marginRight: '5%' }}>Contact us</div>
        <div style={{ color: '#B2BECC', marginLeft: '5%', marginRight: '5%' }}>
          Privacy
        </div>
        <div style={{ color: '#B2BECC' }}>Terms</div>
      </div>
    </>
  );
};

export default Dashboard;
