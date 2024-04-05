const globalStyles = {
  outerRowButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // backgroundColor: 'green',
  },
  outerRowUserProfile: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  outerRowDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profilePicSmall: { width: '25px', height: '25px', borderRadius: 8 },
  nameEmailDiv: {
    justifyContent: 'flex-start',
    justifySelf: 'flex-start',
    marginLeft: 2,
  },
  nameBold: { color: '#2D3748', fontWeight: 700, justifySelf: 'flex-start' },
  email: { color: '#B2BECC', fontWeight: 600, fontSize: 12 },
  titleText: { color: '#2D3748', fontWeight: 700, fontSize: 20 },
  statusText: { color: 'green', fontWeight: 700, fontSize: 20 },
  pencilButton: {
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 6,
  },
  assignmentText: { color: '#78869B', fontWeight: 700 },
  linkText: { color: '#318AFF', fontWeight: 700 },
  profilePicLarge: { width: '75px', height: '75px', borderRadius: 16 },
  userNameText: { color: '#2D3748', fontWeight: 700, fontSize: 24 },
  userEmailText: { color: '#B2BECC', fontWeight: 600, fontSize: 18 },
  scoresDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
  },
  subHeadingText: { color: '#2D3748', fontWeight: 700, marginBottom: 4 },
  descriptionText: { color: '#B2BECC', fontWeight: 600, fontSize: 12 },
  altWorldText: {
    fontWeight: 700,
    marginLeft: 10,
    fontSize: 16,
    color: '#363F4F',
  },
  dashboardText: {
    fontWeight: 700,
    marginLeft: 10,
    fontSize: 12,
    color: '#565E6C',
  },
  plusButton: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  toReviewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    borderColor: '#000000',
  },
  tableHeaderDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    marginLeft: 12,
    marginRight: 24,
    marginTop: 12,
  },
  shortlistButtonDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  shortListButton: {
    paddingLeft: 32,
    paddingRight: 32,
    backgroundColor: '#4fd1c5',
    color: 'white',
    fontWeight: 700,
  },
  cellWrapper: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
  },
  buttons: {
    marginTop: 12,
  },
};

export default globalStyles;