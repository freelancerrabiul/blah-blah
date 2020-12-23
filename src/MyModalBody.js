import { Button } from "@material-ui/core";
import { db } from "./firebase";
import React, { useEffect, useState } from "react";
import MyMessages from "./MyMessages";
import OtherMessage from "./OtherMessage";

function MyModalBody({propName,mainUser}) {
  const [myMessages, setMyMessages] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const ref = db
      .collection("messages")
      .where("sid", "==", `${mainUser}_${propName}`)
      .orderBy("timestamp", "desc")
      .limit(10)
      .get()
      .then((collections) => {
        updateMyMessagesForPagination(collections);
      });
  }, []);

  const updateMyMessagesForPagination = (collections) => {
    try {
      const isSnapshotOfCollectionEmpty = collections.size === 0;
      if (!isSnapshotOfCollectionEmpty) {
        const paginatedMyMessage = collections.docs.map((message) =>
          message.data()
        );
        const lastDoc = collections.docs[collections.docs.length - 1];
        setMyMessages((myMessages) => [...myMessages, ...paginatedMyMessage]);
        setLastDoc(lastDoc);
      } else {
        setIsEmpty(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMoreOfMyMessage = () => {
    try {
      setLoading(true);
      db.collection("messages")
        .where("sid", "==", `${mainUser}_${propName}`)
        .orderBy("timestamp", "desc")
        .startAfter(lastDoc || 0)
        .limit(10)
        .get()
        .then((collections) => {
          updateMyMessagesForPagination(collections);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // <<--    database stuff and pagination for myMessages  {END}   -->

  // <<--    database stuff and pagination for OtherMessage  {START}   -->

  const [othersMessage, setOthersMessage] = useState([]);
  const [lastDocOfOthers, setLastDocOfOthers] = useState();
  const [isOtherDataEmpty, setIsOtherDataEmpty] = useState(false);
  const [loadingDataOfOthers, setLoadingDataOfOthers] = useState(false);

  useEffect(() => {
    db.collection("messages")
      .where("sid", "==", `${propName}_${mainUser}`)
      .orderBy("timestamp", "desc")
      .limit(10)
      .get()
      .then((collections) => {
        updateOthersMessagesForPagination(collections);
      });
  }, []);

  const updateOthersMessagesForPagination = (collections) => {
    try {
      const isSnapshotOfOthersEmpty = collections.size === 0;
      if (!isSnapshotOfOthersEmpty) {
        const paginatedOthersMessage = collections.docs.map((message) =>
          message.data()
        );
        const lastDocOfOthers = collections.docs[collections.docs.length - 1];
        setOthersMessage((otherMessages) => [
          ...otherMessages,
          ...paginatedOthersMessage,
        ]);
        setLastDocOfOthers(lastDocOfOthers);
      } else {
        setIsOtherDataEmpty(true);
      }
      setLoadingDataOfOthers(false);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMoreOfOthersMessage = () => {
    try {
      setLoadingDataOfOthers(true);
      db.collection("messages")
        .where("sid", "==", `${mainUser}_${propName}`)
        .orderBy("timestamp", "desc")
        .startAfter(lastDocOfOthers || 0)
        .limit(10)
        .get()
        .then((collections) => {
          updateOthersMessagesForPagination(collections);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* MyMessages function START from here */}
      <div style={{ padding: "2vh 2vw", display: "inline" }}>
        {myMessages === 0 ? (
          <p>loading...</p>
        ) : (
          myMessages.map((message) => (
            <MyMessages key={message} message={message} />
          ))
        )}

        <div style={{ textAlign: "center" }}>
          {loading && (
            <Button
              style={{
                outlineStyle: "none",
                textTransform: "capitalize",
              }}
            >
              getting data...
            </Button>
          )}
          {!loading && !isEmpty && (
            <Button
              style={{
                outlineStyle: "none",
                textTransform: "capitalize",
              }}
              onClick={loadMoreOfMyMessage}
            >
              More
            </Button>
          )}
          {isEmpty && (
            <p style={{ fontWeight: "bold" }}>There are no more data</p>
          )}
        </div>
      </div>
      {/* MyMessages function END here */}

      {/* OthersMessage function START here */}
      <div style={{ padding: "2vh 2vw", display: "inline" }}>
        <div>
          {othersMessage === 0 ? (
            <p>loading...</p>
          ) : (
            othersMessage.map((message, index) => (
              <OtherMessage key={index} message={message} />
            ))
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          {loadingDataOfOthers && (
            <Button
              style={{
                outlineStyle: "none",
                textTransform: "capitalize",
              }}
            >
              getting data...
            </Button>
          )}
          {!loadingDataOfOthers && !isOtherDataEmpty && (
            <Button
              style={{
                outlineStyle: "none",
                textTransform: "capitalize",
              }}
              onClick={loadMoreOfOthersMessage}
            >
              More
            </Button>
          )}
          {isOtherDataEmpty && (
            <p style={{ fontWeight: "bold" }}>There are no more data</p>
          )}
        </div>
      </div>
      {/* OthersMessage function END Here here */}
    </div>
  );
}

export default MyModalBody;
