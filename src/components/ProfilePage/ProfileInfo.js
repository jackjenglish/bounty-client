import React, { Component } from 'react';
import styled from 'styled-components';
import ProfileDetails from './ProfileDetails';
import ProfileBalance from './ProfileBalance';
import ProfileName from './ProfileName';
import FileUpload from './ImageUploader/FileUpload';
import styles from './ProfileInfo.scss';
import cx from 'classnames';
import Colors from '../styles/Colors';

const InfoContainer = styled.div`
  background: #fff;
  padding: 1rem 1rem 0 1rem;
  border-radius: 0px;
`;

class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.renderBalance = this.renderBalance.bind(this);
  }

  renderBalance(profile) {
    return <ProfileBalance profile={profile} />;
  }

  render() {
    const {
      profile,
      fieldsUpdating,
      userOwnsProfile,
      uploadProfileImage,
      profoUploading
    } = this.props;
    // console.log('ProfileInfo', this.props);
    return (
      <InfoContainer>
        <div className="d-flex">
          <div className="mr-4">
            {userOwnsProfile ? (
              <FileUpload
                upload={uploadProfileImage}
                imgSrc={profile.profileImgSrc}
                loading={profoUploading}
              />
            ) : (
              <div className={styles.headerLogo}>
                {profile.profileImgSrc && (
                  <img
                    src={profile.profileImgSrc}
                    className={cx(styles.profileImg, {
                      [styles.hasProfileImg]: false
                    })}
                  />
                )}
              </div>
            )}
          </div>
          <div>
            <ProfileName
              value={profile.name}
              userOwnsProfile={userOwnsProfile}
              editProfile={this.props.editProfile}
              updating={fieldsUpdating.name}
            />
            <ProfileBalance
              userOwnsProfile={userOwnsProfile}
              editProfile={this.props.editProfile}
              profile={profile}
              updating={fieldsUpdating.balance}
            />
            <ProfileDetails
              profile={profile}
              updating={fieldsUpdating.bio}
              editProfile={this.props.editProfile}
              userOwnsProfile={userOwnsProfile}
            />
          </div>

          {/* <H2>{`${firstName} ${lastName}`}</H2>
          <EditableProfileField value={`${firstName} ${lastName}`} />
          {this.maybeRenderEditProfile()} */}
        </div>
      </InfoContainer>
    );
  }
}

export default ProfileInfo;
