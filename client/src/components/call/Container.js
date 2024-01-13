import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MdOutlineCallEnd } from "react-icons/md";


const useStyles = makeStyles((theme) => ({
  container: {
    border: "1px solid #yourBorderColor",
    borderLeft: "none",
    width: "100%",
    backgroundColor: "#yourPanelBackgroundColor",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
    alignItems: "center",
  },
  text5xl: {
    fontSize: "5xl",
  },
  textLG: {
    fontSize: "lg",
  },
  avatarContainer: {
    margin: `${theme.spacing(3)} 0`,
  },
  remoteVideo: {
    margin: `${theme.spacing(5)} 0`,
    position: "relative",
  },
  localAudio: {
    position: "absolute",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  callEndButton: {
    height: "16px",
    width: "16px",
    backgroundColor: "#red600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    cursor: "pointer",
  },
  icon: {
    fontSize: "3xl",
  },
}));

function Container({ data, callAccepted, endCall }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <span className={classes.text5xl}>{data.name}</span>
        <span className={classes.textLG}>
          {callAccepted && data.callType !== "video"
            ? "Whatsup Voice Call"
            : "Calling..."}
        </span>
      </div>
      {(!callAccepted || data.callType === "audio") && (
        <div className={classes.avatarContainer}>
          <Image
            src={data.profilePicture}
            alt="avatar"
            height={300}
            width={300}
            className="rounded-full"
          />
        </div>
      )}
      <div className={classes.remoteVideo} id="remote-video">
        <div className={classes.localAudio} id="local-audio"></div>
      </div>
      <div className={classes.callEndButton} onClick={endCall}>
        <MdOutlineCallEnd className={classes.icon} />
      </div>
    </div>
  );
}

export default Container;
