import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Props {
    id: string;
    currentStep: string;
    className?: string;
}

const Timeline: React.FC<Props> = ({id, currentStep, className }) => {
    const ref = useRef<SVGSVGElement | null>(null);
    const points = [
        { label: 'Offered', color: 'blue' },
        { label: 'Interviewing', color: 'purple' },
        { label: 'Hired', color: 'green' }

    ];

    useEffect(() => {
        if (!ref.current) return;
        const rejected = currentStep === 'Rejected';

        const svg = d3.select(ref.current);
        svg.selectAll('*').remove();

        const width = 400;
        const height = 100;
        const margin = { left: 50, right: 50 };

        const lineColor = rejected ? 'red' : 'black';

        const fillColors = rejected
            ? points.map(() => 'red')
            : points.map((p) => p.color);
        const textColor = rejected ? 'red' : 'black';

        const xScale = d3
            .scalePoint()
            .domain(points.map((p) => p.label))
            .range([margin.left, width - margin.right])
            .padding(0.5);


        svg
            .append('line')
            .attr('x1', xScale(points[0].label)!)
            .attr('y1', height / 2)
            .attr('x2', xScale(points[points.length - 1].label)!)
            .attr('y2', height / 2)
            .attr('stroke', lineColor)
            .attr('stroke-width', 2);

        const currentIndex = points.findIndex((p) => p.label.toLowerCase() === currentStep.toLowerCase());
        const isRejected = currentStep.toLowerCase() === 'rejected';


        svg
            .selectAll('circle')
            .data(points)
            .enter()
            .append('circle')
            .attr('cx', (d) => xScale(d.label)!)
            .attr('cy', height / 2)
            .attr('r', 12)
            .style('fill', (_d, i) => {
                return rejected ? 'red' : (i <= currentIndex ? fillColors[i] : 'lightgray');
            })

        svg
            .selectAll('text')
            .data(points)
            .enter()
            .append('text')
            .attr('x', (d) => xScale(d.label)!)
            .attr('y', height / 2 - 20)
            .attr('text-anchor', 'middle')
            .style('font-size', '14px')
            .style('fill', (_d, i) => {
                return rejected ? 'red' : (i <= currentIndex ? fillColors[i] : 'lightgray');
            })

            .text((d) => d.label);
    }, [currentStep]);

    return <svg ref={ref}  id={id} className={className} />;
};

export default Timeline;
