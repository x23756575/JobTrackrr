
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Props {
    currentStep: string;
    className?: string;
}

type TimelineEvent = {
    label: string;
    color: string;
}

const points: TimelineEvent[] = [
    { label: 'Offered', color: '#3b82f6' },
    { label: 'Interviewing', color: '#8b5cf6' },
    { label: 'Hired', color: '#10b981' }
];

const Timeline: React.FC<Props> = ({ currentStep, className = '' }) => {
    const ref = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;
        let width;
        let height;
        const svg = d3.select(ref.current);
        svg.selectAll('*').remove();
        const mobile = window.innerWidth < 750;
        if(mobile){
            width = 420;
           height = 120;
        }else{
           width = 600;
            height = 120;
        }

        const margin = { left: 80, right: 80 };

        svg.attr('width', width).attr('height', height);

        const xScale = d3
            .scalePoint()
            .domain(points.map(d => d.label))
            .range([margin.left, width - margin.right]);

        const currentIndex = points.findIndex(
            p => p.label.toLowerCase() === currentStep.toLowerCase()
        );

        const isRejected = currentStep.toLowerCase() === 'rejected';
        const isHired = currentStep.toLowerCase() === 'hired';

        const lineData = points.slice(0, -1);
        svg.selectAll('line.timeline')
            .data(lineData)
            .enter()
            .append('line')
            .attr('class', 'timeline')
            .attr('x1', d => xScale(d.label)!)
            .attr('y1', height / 2)
            .attr('x2', (d, i) => xScale(points[i + 1].label)!)
            .attr('y2', height / 2)
            .attr('stroke', (d, i) => {
                if (isRejected) return '#ef4444';
                if (isHired) return '#10b981';
                return i < currentIndex ? points[i + 1].color : '#d1d5db';
            })
            .attr('stroke-width', 3)
            .attr('opacity', 0.8);

        const circleGroups = svg.selectAll('g.step')
            .data(points)
            .enter()
            .append('g')
            .attr('class', 'step')
            .attr('transform', d => `translate(${xScale(d.label)}, ${height / 2})`);

        circleGroups.append('circle')
            .attr('r', 20)
            .attr('fill', '#f9fafb')
            .attr('stroke', '#e5e7eb')
            .attr('stroke-width', 2);

        circleGroups.append('circle')
            .attr('r', 14)
            .attr('fill', (d, i) => {
                if (isRejected) return '#ef4444';
                if (isHired) return '#10b981';
                return i <= currentIndex ? points[i].color : '#d1d5db';
            })
            .attr('class', (d, i) => i === currentIndex ? 'current-step' : '');

        circleGroups
            .filter((d, i) => i === currentIndex && !isRejected && !isHired)
            .select('circle:last-child')
            .attr('filter', 'url(#glow)');

        const defs = svg.append('defs');
        const filter = defs.append('filter')
            .attr('id', 'glow')
            .attr('x', '-50%')
            .attr('y', '-50%')
            .attr('width', '200%')
            .attr('height', '200%');

        filter.append('feGaussianBlur')
            .attr('stdDeviation', '3')
            .attr('result', 'coloredBlur');

        const feMerge = filter.append('feMerge');
        feMerge.append('feMergeNode').attr('in', 'coloredBlur');
        feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

        svg.selectAll('text.label')
            .data(points)
            .enter()
            .append('text')
            .attr('class', 'label')
            .attr('x', d => xScale(d.label)!)
            .attr('y', height - 20)
            .attr('text-anchor', 'middle')
            .style('font-size', '14px')
            .style('font-weight', '500')
            .style('fill', (d, i) => {
                if (isRejected) return '#ef4444';
                if (isHired) return '#10b981';
                return i <= currentIndex ? '#374151' : '#9ca3af';
            })
            .text(d => d.label);

        circleGroups
            .style('cursor', 'pointer')
            .on('mouseover', function(event, d) {
                d3.select(this).select('circle:last-child')
                    .transition()
                    .duration(200)
                    .attr('r', 16)
                    .attr('opacity', 0.8);
            })
            .on('mouseout', function(event, d) {
                d3.select(this).select('circle:last-child')
                    .transition()
                    .duration(200)
                    .attr('r', 14)
                    .attr('opacity', 1);
            });

    }, [currentStep]);

    return <svg ref={ref} className={className}></svg>;
};

export default Timeline;
