import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import { useGlobals } from "../../hooks/useGlobals";
import { useState } from "react";
import type { MemberUpdateInput } from "../../../lib/types/member";
import type { T } from "../../../lib/types/common";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { Messages, serverApi } from "../../../lib/config";
import MemberService from "../../services/MemberService";

export function Settings() {
  const { authMember, setAuthMember } = useGlobals();
  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/${authMember.memberImage}`
      : "/icons/default-user.svg",
  );
  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
    {
      memberNick: authMember?.memberNick,
      memberPhone: authMember?.memberPhone,
      memberAddress: authMember?.memberAddress,
      memberDesc: authMember?.memberDesc,
      memberImage: authMember?.memberImage,
    },
  );

  /** HANDLERS **/

  const memberNickHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberPhoneHandler = (e: T) => {
    memberUpdateInput.memberPhone = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberAddressHandler = (e: T) => {
    memberUpdateInput.memberAddress = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberDescriptionHandler = (e: T) => {
    memberUpdateInput.memberDesc = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const handleSubmitButton = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (
        memberUpdateInput.memberNick === "" ||
        memberUpdateInput.memberPhone === "" ||
        memberUpdateInput.memberAddress === "" ||
        memberUpdateInput.memberDesc === ""
      ) {
        throw new Error(Messages.error3);
      }

      const member = new MemberService();
      const result = await member.updateMember(memberUpdateInput);
      setAuthMember(result);

      await sweetTopSmallSuccessAlert("Modified successfully", 700);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handleImageViewer = (e: T) => {
    const file = e.target.files[0];
    console.log("file:", file);
    const fileType = file.type,
      validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!validateImageTypes.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      if (file) {
        memberUpdateInput.memberImage = file;
        setMemberUpdateInput({ ...memberUpdateInput });
        setMemberImage(URL.createObjectURL(file));
      }
    }
  };

  return (
    <Box className={"settings"}>
      {/* Profile Image Media Upload Container */}
      <Box className={"member-media-frame"}>
        <div className={"avatar-preview-wrapper"}>
          <img src={memberImage} className={"mb-image"} alt="Avatar Preview" />
        </div>
        <div className={"media-change-box"}>
          <span className={"upload-title"}>Upload Profile Avatar</span>
          <p className={"upload-subtitle"}>Supported formats: JPG, JPEG, PNG</p>
          <div className={"up-del-box"}>
            <Button
              component="label"
              className={"upload-action-btn"}
              onChange={handleImageViewer}
            >
              <CloudDownloadIcon sx={{ fontSize: 18 }} />
              <span>Choose Image</span>
              <input type="file" hidden />
            </Button>
          </div>
        </div>
      </Box>

      {/* Form Input Group: Username */}
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>USERNAME</label>
          <input
            className={"spec-input mb-nick"}
            type="text"
            placeholder={authMember?.memberNick}
            value={memberUpdateInput.memberNick || ""}
            name="memberNick"
            onChange={memberNickHandler}
          />
        </div>
      </Box>

      {/* Form Input Group: Phone & Address */}
      <Box className={"input-frame dual-row"}>
        <div className={"short-input"}>
          <label className={"spec-label"}>PHONE NUMBER</label>
          <input
            className={"spec-input mb-phone"}
            type="text"
            placeholder={authMember?.memberPhone ?? "no phone"}
            value={memberUpdateInput.memberPhone || ""}
            name="memberPhone"
            onChange={memberPhoneHandler}
          />
        </div>
        <div className={"short-input"}>
          <label className={"spec-label"}>ADDRESS</label>
          <input
            className={"spec-input mb-address"}
            type="text"
            placeholder={
              authMember?.memberAddress
                ? authMember.memberAddress
                : "no address"
            }
            value={memberUpdateInput.memberAddress || ""}
            name="memberAddress"
            onChange={memberAddressHandler}
          />
        </div>
      </Box>

      {/* Form Input Group: Bio / Description */}
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>BIOGRAPHY & NOTES</label>
          <textarea
            className={"spec-textarea mb-description"}
            placeholder={
              authMember?.memberDesc ? authMember.memberDesc : "no description"
            }
            value={memberUpdateInput.memberDesc || ""}
            name="memberDesc"
            onChange={memberDescriptionHandler}
            rows={4}
          />
        </div>
      </Box>

      {/* Submit Button */}
      <Box className={"save-box"}>
        <Button
          variant={"contained"}
          className={"save-settings-btn"}
          onClick={handleSubmitButton}
          startIcon={<SaveIcon />}
        >
          SAVE CHANGES
        </Button>
      </Box>
    </Box>
  );
}
