import type { FC } from 'react';
import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { Badge, BadgeSize, Gap, Tooltip, BadgeType, GapSize } from '@endeavour/ui-kit';
import type { ConsultationResponse } from '@endeavour/verification-integration';
import type { EventApi } from '@fullcalendar/core';
import { default as dayGridPlugin } from '@fullcalendar/daygrid';
import { default as interactionPlugin } from '@fullcalendar/interaction';
import { default as FullCalendar } from '@fullcalendar/react';
import { default as timeGridPlugin } from '@fullcalendar/timegrid';

import { createClassName, createStyleHelper } from '../../utils/class-names';

import styles from './calendar.module.scss';

const style = createStyleHelper(styles, 'calendar');

export interface ICalendarProps {
    className?: string;
    events: Partial<EventCalendar>[];
    onChange?: (e: SelectCalendar) => void;
    eventContent?: FC;
}

export interface SelectCalendar {
    start: Date;
    end: Date;
}

export interface EventCalendar extends EventApi {
    start: Date;
    end: Date;
}

export function Calendar({
    className,
    events,
    onChange,
    eventContent = renderEventContent,
}: ICalendarProps) {
    const [currentEvent, setCurrentEvent] = useState<SelectCalendar>();

    const select = useCallback(
        (e: SelectCalendar) => {
            setCurrentEvent(e);
            if (onChange) {
                onChange(e);
            }
        },
        [onChange],
    );

    const plugins = useMemo(() => [dayGridPlugin, interactionPlugin, timeGridPlugin], []);

    const headerToolbar = useMemo(
        () => ({
            left: 'dayGridMonth,timeGridWeek,timeGridDay',
            center: 'title',
            right: 'prev,today,next',
        }),
        [],
    );

    const buttonText = useMemo(
        () => ({
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
        }),
        [],
    );

    const currentEvents = currentEvent ? [...events, currentEvent] : events;
    // console.log(currentEvents);
    return (
        <div className={createClassName([className, style()])}>
            <FullCalendar
                plugins={plugins}
                initialView="dayGridMonth"
                events={currentEvents}
                editable={!!onChange ?? false}
                selectable={!!onChange ?? false}
                headerToolbar={headerToolbar}
                buttonText={buttonText}
                selectMirror={true}
                dayMaxEvents={true}
                eventContent={eventContent}
                select={select}
            />
        </div>
    );
}

// a custom render function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderEventContent(eventInfo: any) {
    const consultation = eventInfo.event.extendedProps;

    return (
        // eslint-disable-next-line @arthurgeron/react-usememo/require-usememo
        <Tooltip content={<TooltipContent eventInfo={consultation} />} direction={'top'}>
            <div className={style('calendar-event-component')}>
                <div>
                    <Link to={'/dashboard/consultations/scheduling/' + eventInfo.event.title}>
                        <Badge size={BadgeSize.CAPTION} type={BadgeType.COMPLEMENTARY}>
                            Acessar detalhes{' '}
                        </Badge>
                    </Link>
                </div>
            </div>
        </Tooltip>
    );
}

function TooltipContent({ eventInfo }: { eventInfo: ConsultationResponse }) {
    // console.log(eventInfo);
    return (
        <Gap>
            <div>
                <p>Consulta</p>
                <Gap size={GapSize.SMALL}>
                    <Badge size={BadgeSize.CAPTION} type={BadgeType.INFO}>
                        Dia {eventInfo.day}
                    </Badge>

                    <Gap direction="horizontal" size={GapSize.SMALL}>
                        <Badge size={BadgeSize.CAPTION} type={BadgeType.INFO}>
                            Das {eventInfo.startTime}
                        </Badge>
                        <Badge size={BadgeSize.CAPTION} type={BadgeType.INFO}>
                            Até {eventInfo.endTime}
                        </Badge>
                    </Gap>
                </Gap>
            </div>
            <div>
                <p>Clínico</p>
                <Gap size={GapSize.SMALL}>
                    <Badge size={BadgeSize.CAPTION} type={BadgeType.INFO}>
                        {eventInfo.veterinarian?.fullName}
                    </Badge>
                    <Gap direction="horizontal" size={GapSize.SMALL}>
                        <Badge size={BadgeSize.CAPTION} type={BadgeType.COMPLEMENTARY}>
                            Acessar Clínico
                        </Badge>
                        {eventInfo.notificationVetetinarian ? (
                            <Badge size={BadgeSize.CAPTION} type={BadgeType.SUCCESS}>
                                Email enviado
                            </Badge>
                        ) : (
                            <Badge size={BadgeSize.CAPTION} type={BadgeType.ALERT}>
                                Enviar Email de notificação
                            </Badge>
                        )}
                    </Gap>
                </Gap>
            </div>
            <div>
                <p>Paciente</p>
                <Gap size={GapSize.SMALL}>
                    <Badge size={BadgeSize.CAPTION} type={BadgeType.INFO}>
                        {eventInfo.pet?.name}
                    </Badge>
                    <Badge size={BadgeSize.CAPTION} type={BadgeType.COMPLEMENTARY}>
                        Acessar paciente
                    </Badge>
                </Gap>
            </div>{' '}
            <div>
                <p>Responsável</p>
                <Gap size={GapSize.SMALL}>
                    <Badge size={BadgeSize.CAPTION} type={BadgeType.INFO}>
                        Responsável
                    </Badge>
                    <Gap direction="horizontal" size={GapSize.SMALL}>
                        <Badge size={BadgeSize.CAPTION} type={BadgeType.COMPLEMENTARY}>
                            Acessar responsável
                        </Badge>
                        {eventInfo.notificationResponsible ? (
                            <Badge size={BadgeSize.CAPTION} type={BadgeType.SUCCESS}>
                                Email enviado
                            </Badge>
                        ) : (
                            <Badge size={BadgeSize.CAPTION} type={BadgeType.ALERT}>
                                Enviar Email de notificação
                            </Badge>
                        )}
                    </Gap>
                </Gap>
            </div>{' '}
        </Gap>
    );
}
