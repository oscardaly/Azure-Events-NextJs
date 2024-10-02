import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FC, useState} from "react";
import {SocietyEvent} from "@/app/types/SocietyEvent";
import {Textarea} from "@/components/ui/textarea";
import {FileUpload} from "@/components/file-upload";

interface EventFormProps {
    isEditing: boolean,
    event: SocietyEvent,
    setEditingEvent: (event: SocietyEvent) => void,
    setNewEvent: (event: SocietyEvent) => void
}

export const EventForm: FC<EventFormProps> = ({ isEditing, event, setEditingEvent, setNewEvent }) => {
    const [newQuestion, setNewQuestion] = useState('');

    const handleInputChange = (field: keyof SocietyEvent, value: string | number) => {
        if (isEditing)
            setEditingEvent({ ...event, [field]: value });
        else
            setNewEvent({ ...event, [field]: value });
    }

    const handleAddQuestion = () => {
        if (isEditing) {
            setEditingEvent({
                ...event,
                questions: [...event.questions, newQuestion],
            })
        } else {
            setNewEvent({
                ...event,
                questions: [...event.questions, newQuestion],
            })
        }
        setNewQuestion('')
    }

    const handleRemoveQuestion = (index: number) => {
        if (isEditing) {
            const updatedQuestions = [...event.questions]
            updatedQuestions.splice(index, 1)
            setEditingEvent({ ...event, questions: updatedQuestions })
        } else {
            const updatedQuestions = [...event.questions]
            updatedQuestions.splice(index, 1)
            setNewEvent({ ...event, questions: updatedQuestions })
        }
    }

    const handleFileSelect = (file: File | null) => {
        // setNewEventImage(file)
        // handleInputChange('image', file)
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5 col-span-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={event.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                />
            </div>
            <div className="flex flex-col space-y-1.5 col-span-2">
                <Label htmlFor="date">Date</Label>
                <Input
                    id="date"
                    type="date"
                    value={event?.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                />
            </div>
            <div className="flex flex-col space-y-1.5 col-span-2">
                <Label htmlFor="time">Time</Label>
                <Input
                    id="time"
                    type="time"
                    value={event?.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                />
            </div>
            <div className="flex flex-col space-y-1.5 col-span-2">
                <Label htmlFor="price">Price</Label>
                <Input
                    id="price"
                    type="number"
                    value={event.price}
                    onChange={(e) => handleInputChange('price', Number(e.target.value))}
                />
            </div>
            <div className="flex flex-col space-y-1.5 col-span-2">
                <Label htmlFor="ticketsLeft">Tickets Left</Label>
                <Input
                    id="ticketsLeft"
                    type="number"
                    value={event.ticketsLeft}
                    onChange={(e) => handleInputChange('ticketsLeft', Number(e.target.value))}
                />
            </div>
            <div className="flex flex-col space-y-1.5 col-span-2">
                <Label htmlFor="location">Location</Label>
                <Input
                    id="location"
                    value={event.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                />
            </div>
            <div className="flex flex-col space-y-1.5 col-span-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={event.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                />
            </div>
            <div className="flex flex-col space-y-1.5 col-span-4">
                <FileUpload onFileSelect={handleFileSelect}/>
            </div>
            <div className="flex flex-col space-y-1.5 col-span-4">
                <Label htmlFor="questions">Questions</Label>
                <div className="flex space-x-2">
                    <Input
                        id="questions"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder="Enter a new question"
                    />
                    <Button onClick={handleAddQuestion}>Add</Button>
                </div>
                <ul className="list-disc list-inside mt-2">
                    {(event.questions).map((question, index) => (
                        <li key={index} className="flex justify-between items-center">
                            {question}
                            <Button variant="destructive" size="sm"
                                    onClick={() => handleRemoveQuestion(index)}>Remove</Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
