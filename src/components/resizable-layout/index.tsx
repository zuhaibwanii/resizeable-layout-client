import React, { useState, useRef, useContext, useEffect } from "react";
import { useResizable } from "react-resizable-layout";

//components
import SampleSplitter from "./sample-splotter";
import CustomButton from "../custom/button";

//utils
import { cn } from "../../utils/cn";

//styles
import './index.styles.css'

//theme
import palette from "../../theme";

//constants
import { TOAST_SEVERITY } from '../../constants';

//services
import windowServices from '../../services/window';

//global-states
import { GlobalStates } from '../../App';
import isEmpty from "../../utils/isEmpty";

const ResizeableLayout = (): JSX.Element => {
    const { globalStates } = useContext(GlobalStates);
    const { isDragging: isTerminalDragging, position: terminalH, splitterProps: terminalDragBarProps } = useResizable({ axis: "y", initial: 150, min: 50, reverse: true });
    const { isDragging: isFileDragging, position: fileW, splitterProps: fileDragBarProps } = useResizable({ axis: "x", initial: 250, min: 50 });
    const { isDragging: isPluginDragging, position: pluginW, splitterProps: pluginDragBarProps } = useResizable({ axis: "x", initial: 200, min: 50, reverse: true });

    const [isAdd, setIsAdd] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [count, setCount] = useState(0);
    const [saving, setSaving] = useState(false);
    const [windowData, setWindowData] = useState({
        _id: 0,
        windowOne: "",
        windowTwo: "",
        windowThree: "",
    });

    const windowOne = useRef<HTMLDivElement>(null);;
    const windowTwo = useRef<HTMLDivElement>(null);;
    const windowThree = useRef<HTMLDivElement>(null);;

    useEffect(() => {
        fetchWindowData()
    }, [])

    const fetchWindowData = async () => {
        const response = await windowServices.getWindowData();
        // console.log('response = ', response);
        if (response.status === 200) {
            let respData = response.data.data || null;
            if (respData) {
                setWindowData(respData.data[0]);
                setCount(respData.totalCount);
                if (windowOne.current) windowOne.current.textContent = respData.data[0].windowOne;
                if (windowTwo.current) windowTwo.current.textContent = respData.data[0].windowTwo;
                if (windowThree.current) windowThree.current.textContent = respData.data[0].windowThree;
            }
        }
    }

    const handleAddClick = () => {
        if (windowOne.current) windowOne.current.textContent = "";
        if (windowTwo.current) windowTwo.current.textContent = "";
        if (windowThree.current) windowThree.current.textContent = "";
        setIsAdd(true);
    }

    const handleUpdateClick = () => setIsUpdate(true);

    const getWindowOneTextContent = () => {
        if (windowOne.current) return windowOne.current.textContent;
        return "";
    }
    const getWindowTwoTextContent = () => {
        if (windowTwo.current) return windowTwo.current.textContent;
        return "";
    }
    const getWindowThreeTextContent = () => {
        if (windowThree.current) return windowThree.current.textContent;
        return "";
    }

    const validate = () => {
        let isValid = true;
        if (windowOne.current && isEmpty(windowOne.current.textContent)) {
            isValid = false;
        }
        if (windowTwo.current && isEmpty(windowTwo.current.textContent)) {
            isValid = false;
        }
        if (windowThree.current && isEmpty(windowThree.current.textContent)) {
            isValid = false;
        }
        return isValid;
    }


    const createWindowData = async () => {
        const isValid = validate();
        const toast = {
            open: true,
            severity: TOAST_SEVERITY.success,
            message: ''
        }
        if (!isValid) {
            toast.severity = TOAST_SEVERITY.error;
            toast.message = 'Windows cannot be empty';
            globalStates.handleToast(toast);
            return
        }
        setSaving(true);
        const payload = {
            windowOne: getWindowOneTextContent(),
            windowTwo: getWindowTwoTextContent(),
            windowThree: getWindowThreeTextContent()
        }
        const response = await windowServices.createWindowData(payload);
        setSaving(false);
        toast.message = response.data.message;
        if (response.status === 200 || response.status === 201) {
            toast.severity = TOAST_SEVERITY.success;
            setIsAdd(false);
            fetchWindowData()
        } else {
            toast.severity = TOAST_SEVERITY.error;
        }
        globalStates.handleToast(toast);
    }

    const updateWindowData = async () => {
        const isValid = validate();
        const toast = {
            open: true,
            severity: TOAST_SEVERITY.success,
            message: ''
        }
        if (!isValid) {
            toast.severity = TOAST_SEVERITY.error;
            toast.message = 'Windows cannot be empty';
            globalStates.handleToast(toast);
            return
        }
        setSaving(true);
        const payload = {
            id: windowData._id,
            windowOne: getWindowOneTextContent(),
            windowTwo: getWindowTwoTextContent(),
            windowThree: getWindowThreeTextContent()
        }
        const response = await windowServices.updateWindowData(payload);
        setSaving(false);
        toast.message = response.data.message;
        if (response.status === 200 || response.status === 201) {
            toast.severity = TOAST_SEVERITY.success;
            setIsUpdate(false)
            fetchWindowData()
        } else {
            toast.severity = TOAST_SEVERITY.error;
        }
        globalStates.handleToast(toast);
    }

    return (
        <>
            <div className={"flex flex-column h-screen bg-dark font-mono color-white overflow-hidden"}>
                <div className={"flex grow"}>
                    <div ref={windowOne} contentEditable={isAdd || isUpdate} className={`${cn("shrink-0 contents", isFileDragging && "dragging")}`} style={{ width: fileW }}>
                        Window One
                    </div>
                    <SampleSplitter isDragging={isFileDragging} {...fileDragBarProps} />
                    <div className={"flex grow"}>
                        <div ref={windowTwo} className={"grow bg-darker contents"} contentEditable={isAdd || isUpdate}>Window Two</div>
                        <SampleSplitter isDragging={isPluginDragging} {...pluginDragBarProps} />
                    </div>
                </div>
                <SampleSplitter dir={"horizontal"} isDragging={isTerminalDragging} {...terminalDragBarProps} />
                <div ref={windowThree} contentEditable={isAdd || isUpdate} className={cn("shrink-0 bg-darker contents", isTerminalDragging && "dragging")} style={{ height: terminalH }}>
                    Window Three
                </div>
            </div>
            <div className="count-wrapper">Count: {count}</div>
            <div className="btn-wrapper">
                {isAdd || isUpdate ?
                    <CustomButton
                        btnText="Save"
                        handleClick={isAdd ? createWindowData : updateWindowData}
                        loading={saving}
                        bgcolor={palette.colors.green}
                        borderColor={palette.colors.green}
                    /> :
                    <>
                        <CustomButton btnText="Add" handleClick={handleAddClick} />
                        <CustomButton btnText="Update" handleClick={handleUpdateClick} bgcolor={palette.colors.white} textColor={palette.colors.red} />
                    </>
                }


            </div>
        </>
    );




};

export default ResizeableLayout
